import { parseIdentifier } from '@/common/utils';
import {
  CreateGameDto,
  FinalizeGameDto,
  UpdateGameDto,
  UpdateScoreDto,
} from '@/modules/games/dtos';
import {
  GamesRepository,
  ParticipantsRepository,
} from '@/modules/games/repositories';
import {
  PerformancesRepository,
  TeamsRepository,
} from '@/modules/teams/repositories';
import { Transactional } from '@nestjs-cls/transactional';
import { BadRequestException, Injectable } from '@nestjs/common';
import { GameStatus, Prisma } from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(
    private readonly gamesRepository: GamesRepository,
    private readonly participantsRepository: ParticipantsRepository,
    private readonly performancesRepository: PerformancesRepository,
    private readonly teamsRepository: TeamsRepository,
  ) {}

  async create(dto: CreateGameDto) {
    const { awayId, homeId, ...gameDate } = dto;

    const awayTeam = await this.teamsRepository.findUniqueOrThrow({
      where: { id: awayId },
      select: { abbreviation: true },
    });
    const homeTeam = await this.teamsRepository.findUniqueOrThrow({
      where: { id: homeId },
      select: { abbreviation: true },
    });

    return this.gamesRepository.create({
      data: {
        ...gameDate,
        slug: this.generateSlug(
          dto.date,
          awayTeam.abbreviation,
          homeTeam.abbreviation,
        ),
        date: new Date(dto.date),
        gameParticipants: {
          create: [
            { teamId: dto.awayId, isHomeTeam: false },
            { teamId: dto.homeId, isHomeTeam: true },
          ],
        },
      },
    });
  }

  async findMany() {
    return this.gamesRepository.findMany({});
  }

  async find(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.gamesRepository.findUniqueOrThrow({ where });
  }

  @Transactional()
  async update(identifier: string, dto: UpdateGameDto) {
    const where = parseIdentifier(identifier);
    const { awayId, homeId, ...gameData } = dto;
    const data: Prisma.GameUpdateInput = { ...gameData };

    if (dto.date) data.date = new Date(dto.date);

    if (dto.date || awayId || homeId) {
      const existingGame =
        await this.gamesRepository.findWithParticipants(where);

      const finalAwayId =
        awayId ?? existingGame.gameParticipants.find(p => !p.isHomeTeam).teamId;
      const finalHomeId =
        homeId ?? existingGame.gameParticipants.find(p => p.isHomeTeam).teamId;

      const [awayTeam, homeTeam] = await Promise.all([
        this.teamsRepository.findUniqueOrThrow({
          where: { id: finalAwayId },
          select: { abbreviation: true },
        }),
        this.teamsRepository.findUniqueOrThrow({
          where: { id: finalHomeId },
          select: { abbreviation: true },
        }),
      ]);

      data.slug = this.generateSlug(
        dto.date ?? existingGame.date.toISOString(),
        awayTeam.abbreviation,
        homeTeam.abbreviation,
      );

      const updatedGame = await this.gamesRepository.update({ where, data });

      if (awayId) {
        await this.participantsRepository.updateMany({
          where: { gameId: existingGame.id, isHomeTeam: false },
          data: { teamId: awayId },
        });
      }

      if (homeId) {
        await this.participantsRepository.updateMany({
          where: { gameId: existingGame.id, isHomeTeam: true },
          data: { teamId: homeId },
        });
      }

      return updatedGame;
    }

    return this.gamesRepository.update({ where, data });
  }

  async delete(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.gamesRepository.delete({ where });
  }

  @Transactional()
  async updateScore(identifier: string, dto: UpdateScoreDto) {
    const where = parseIdentifier(identifier);
    const game = await this.gamesRepository.findWithParticipants(where);

    if (dto.awayScore != null) {
      await this.participantsRepository.updateMany({
        where: { gameId: game.id, isHomeTeam: false },
        data: { score: dto.awayScore },
      });
    }

    if (dto.homeScore != null) {
      await this.participantsRepository.updateMany({
        where: { gameId: game.id, isHomeTeam: true },
        data: { score: dto.homeScore },
      });
    }

    return this.gamesRepository.update({
      where,
      data: { status: GameStatus.IN_PROGRESS },
    });
  }

  @Transactional()
  async finalizeGame(identifier: string, dto: FinalizeGameDto) {
    const where = parseIdentifier(identifier);
    const game = await this.gamesRepository.findWithParticipants(where);

    let awayScore = dto.awayScore;
    let homeScore = dto.homeScore;

    if (awayScore == null || homeScore == null) {
      const participants = await this.participantsRepository.findMany({
        where: { gameId: game.id },
        select: { isHomeTeam: true, score: true },
      });

      if (awayScore == null)
        awayScore = participants.find(p => !p.isHomeTeam).score;

      if (homeScore == null)
        homeScore = participants.find(p => p.isHomeTeam).score;
    }

    if (awayScore == null || homeScore == null) {
      throw new BadRequestException(
        'Both scores must be set before finalizing game',
      );
    }

    await this.participantsRepository.updateMany({
      where: { gameId: game.id, isHomeTeam: false },
      data: { score: awayScore, isWinner: awayScore > homeScore },
    });

    await this.participantsRepository.updateMany({
      where: { gameId: game.id, isHomeTeam: true },
      data: { score: homeScore, isWinner: homeScore > awayScore },
    });

    await this.gamesRepository.update({
      where,
      data: {
        status: GameStatus.FINAL,
        endedInOvertime: dto.endedInOvertime,
        overtimes: dto.overtimes,
      },
    });

    for (const participant of game.gameParticipants) {
      const isWinner = participant.isHomeTeam
        ? homeScore > awayScore
        : awayScore > homeScore;

      await this.updateTeamSeasonPerformance(
        participant.teamId,
        game.seasonId,
        participant.isHomeTeam,
        isWinner,
        game.isConferenceGame,
        game.isNeutralSite,
      );
    }
  }

  private async updateTeamSeasonPerformance(
    teamId: number,
    seasonId: number,
    isHomeTeam: boolean,
    isWinner: boolean,
    isConferenceGame: boolean,
    isNeutralSite: boolean,
  ) {
    const { streak, isWinStreak } = await this.calculateStreak(
      teamId,
      seasonId,
      isWinner,
    );

    await this.performancesRepository.upsert({
      where: { teamId_seasonId: { teamId, seasonId } },
      create: {
        wins: isWinner ? 1 : 0,
        losses: isWinner ? 0 : 1,
        conferenceWins: isConferenceGame && isWinner ? 1 : 0,
        conferenceLosses: isConferenceGame && !isWinner ? 1 : 0,
        homeWins: isHomeTeam && !isNeutralSite && isWinner ? 1 : 0,
        homeLosses: isHomeTeam && !isNeutralSite && !isWinner ? 1 : 0,
        awayWins: !isHomeTeam && !isNeutralSite && isWinner ? 1 : 0,
        awayLosses: !isHomeTeam && !isNeutralSite && !isWinner ? 1 : 0,
        neutralWins: isNeutralSite && isWinner ? 1 : 0,
        neutralLosses: isNeutralSite && !isWinner ? 1 : 0,
        streak,
        isWinStreak,
        teamId,
        seasonId,
      },
      update: {
        wins: { increment: isWinner ? 1 : 0 },
        losses: { increment: !isWinner ? 1 : 0 },
        conferenceWins: { increment: isConferenceGame && isWinner ? 1 : 0 },
        conferenceLosses: { increment: isConferenceGame && !isWinner ? 1 : 0 },
        homeWins: {
          increment: isHomeTeam && !isNeutralSite && isWinner ? 1 : 0,
        },
        homeLosses: {
          increment: isHomeTeam && !isNeutralSite && !isWinner ? 1 : 0,
        },
        awayWins: {
          increment: !isHomeTeam && !isNeutralSite && isWinner ? 1 : 0,
        },
        awayLosses: {
          increment: !isHomeTeam && !isNeutralSite && !isWinner ? 1 : 0,
        },
        neutralWins: { increment: isNeutralSite && isWinner ? 1 : 0 },
        neutralLosses: { increment: isNeutralSite && !isWinner ? 1 : 0 },
        streak,
        isWinStreak,
      },
    });
  }

  private async calculateStreak(
    teamId: number,
    seasonId: number,
    isWinner: boolean,
  ): Promise<{ streak: number; isWinStreak: boolean }> {
    const performance = await this.performancesRepository.findUnique({
      where: { teamId_seasonId: { teamId, seasonId } },
      select: { streak: true, isWinStreak: true },
    });
    if (
      performance &&
      performance.streak != null &&
      performance.isWinStreak === isWinner
    ) {
      return { streak: performance.streak + 1, isWinStreak: isWinner };
    }
    return { streak: 1, isWinStreak: isWinner };
  }

  private generateSlug(
    date: string,
    awayAbbreviation: string,
    homeAbbreviation: string,
  ): string {
    return `${date.split('T')[0]}-${awayAbbreviation}-${homeAbbreviation}`.toLowerCase();
  }
}
