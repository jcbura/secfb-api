import { parseIdentifier } from '@/common/utils';
import {
  adaptGamesToDto,
  adaptGameToDto,
  GAME_INCLUDE,
} from '@/modules/games/adapters';
import {
  BulkCreateGamesDto,
  CreateGameDto,
  FinalizeGameDto,
  GameResponseDto,
  QueryGameDto,
  UpdateGameDto,
} from '@/modules/games/dtos';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  GameStatus,
  ParticipantRole,
  Prisma,
  StreakType,
} from '@prisma/client';

@Injectable()
export class GamesService {
  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async create(dto: CreateGameDto): Promise<GameResponseDto> {
    const { awayTeamId, homeTeamId, ...gameData } = dto;

    const awayTeam = await this.txHost.tx.team.findUniqueOrThrow({
      where: { id: awayTeamId },
      select: { abbreviation: true },
    });
    const homeTeam = await this.txHost.tx.team.findUniqueOrThrow({
      where: { id: homeTeamId },
      select: { abbreviation: true },
    });

    const game = await this.txHost.tx.game.create({
      data: {
        ...gameData,
        slug: this.generateSlug(
          dto.date,
          awayTeam.abbreviation,
          homeTeam.abbreviation,
        ),
        date: new Date(dto.date),
        gameParticipants: {
          create: [
            { teamId: awayTeamId, role: ParticipantRole.AWAY },
            { teamId: homeTeamId, role: ParticipantRole.HOME },
          ],
        },
      },
      include: GAME_INCLUDE,
    });

    return adaptGameToDto(game);
  }

  @Transactional()
  async createMany(dto: BulkCreateGamesDto): Promise<GameResponseDto[]> {
    const createdGames: GameResponseDto[] = [];

    for (const gameDto of dto.games) {
      const {
        status,
        awayScore,
        homeScore,
        endedInOvertime,
        overtimes,
        ...createGameData
      } = gameDto;

      const createdGame = await this.create(createGameData);

      if (status === GameStatus.FINAL) {
        if (awayScore === undefined || homeScore === undefined) {
          throw new BadRequestException(
            `Game ${createdGame.slug} marked as FINAL but missing scores`,
          );
        }

        const finalizedGame = await this.finalizeGame(createdGame.slug, {
          awayScore,
          homeScore,
          endedInOvertime: endedInOvertime ?? false,
          overtimes: overtimes ?? null,
        });

        createdGames.push(finalizedGame);
      } else {
        createdGames.push(createdGame);
      }
    }

    return createdGames;
  }

  async findMany(query: QueryGameDto) {
    const where = query.toWhereInput();
    const orderBy = query.toOrderByInput();
    const games = await this.txHost.tx.game.findMany({
      where,
      include: GAME_INCLUDE,
      orderBy,
    });
    return adaptGamesToDto(games);
  }

  async find(identifier: string): Promise<GameResponseDto> {
    const where = parseIdentifier(identifier);
    const game = await this.txHost.tx.game.findUniqueOrThrow({
      where,
      include: GAME_INCLUDE,
    });
    return adaptGameToDto(game);
  }

  @Transactional()
  async update(
    identifier: string,
    dto: UpdateGameDto,
  ): Promise<GameResponseDto> {
    const where = parseIdentifier(identifier);
    const { awayTeamId, homeTeamId, ...gameData } = dto;
    const data: Prisma.GameUpdateInput = { ...gameData };

    if (dto.date) {
      data.date = new Date(dto.date);
    }

    const existingGame = await this.txHost.tx.game.findUniqueOrThrow({
      where,
      select: {
        id: true,
        status: true,
        date: true,
        gameParticipants: {
          select: {
            teamId: true,
            role: true,
          },
        },
      },
    });

    if (existingGame.status === GameStatus.FINAL) {
      throw new BadRequestException('Cannot update a finalized game');
    }

    if (dto.date || awayTeamId || homeTeamId) {
      const finalAwayTeamId =
        awayTeamId ??
        existingGame.gameParticipants.find(p => p.role === 'AWAY')?.teamId;
      const finalHomeTeamId =
        homeTeamId ??
        existingGame.gameParticipants.find(p => p.role === 'HOME')?.teamId;

      const [awayTeam, homeTeam] = await Promise.all([
        this.txHost.tx.team.findUniqueOrThrow({
          where: { id: finalAwayTeamId },
          select: { abbreviation: true },
        }),
        this.txHost.tx.team.findUniqueOrThrow({
          where: { id: finalHomeTeamId },
          select: { abbreviation: true },
        }),
      ]);

      data.slug = this.generateSlug(
        dto.date ?? existingGame.date.toISOString(),
        awayTeam.abbreviation,
        homeTeam.abbreviation,
      );

      await this.txHost.tx.game.update({ where, data });

      if (awayTeamId) {
        await this.txHost.tx.gameParticipant.updateMany({
          where: {
            gameId: existingGame.id,
            role: ParticipantRole.AWAY,
          },
          data: { teamId: awayTeamId },
        });
      }

      if (homeTeamId) {
        await this.txHost.tx.gameParticipant.updateMany({
          where: {
            gameId: existingGame.id,
            role: ParticipantRole.HOME,
          },
          data: { teamId: homeTeamId },
        });
      }

      const updatedGame = await this.txHost.tx.game.findUniqueOrThrow({
        where,
        include: GAME_INCLUDE,
      });

      return adaptGameToDto(updatedGame);
    }

    await this.txHost.tx.game.update({ where, data });

    const updatedGame = await this.txHost.tx.game.findUniqueOrThrow({
      where,
      include: GAME_INCLUDE,
    });

    return adaptGameToDto(updatedGame);
  }

  async delete(identifier: string): Promise<GameResponseDto> {
    const where = parseIdentifier(identifier);
    const game = await this.txHost.tx.game.delete({
      where,
      include: GAME_INCLUDE,
    });
    return adaptGameToDto(game);
  }

  @Transactional()
  async finalizeGame(identifier: string, dto: FinalizeGameDto) {
    const where = parseIdentifier(identifier);

    const game = await this.txHost.tx.game.findUniqueOrThrow({
      where,
      select: {
        id: true,
        status: true,
        isConferenceGame: true,
        isNeutralSite: true,
        seasonId: true,
        gameParticipants: {
          select: {
            id: true,
            teamId: true,
            role: true,
            score: true,
            isWinner: true,
          },
        },
      },
    });

    const awayParticipant = game.gameParticipants.find(
      participant => participant.role === ParticipantRole.AWAY,
    );
    const homeParticipant = game.gameParticipants.find(
      participant => participant.role === ParticipantRole.HOME,
    );

    const isAlreadyFinalized = game.status === GameStatus.FINAL;
    const newHomeWon = dto.homeScore > dto.awayScore;
    const oldHomeWon = homeParticipant.isWinner === true;
    const isDifferentWinner = isAlreadyFinalized && newHomeWon !== oldHomeWon;

    if (isDifferentWinner) {
      await this.undoGameStats(game);
    }

    await this.txHost.tx.game.update({
      where: { id: game.id },
      data: {
        status: GameStatus.FINAL,
        endedInOvertime: dto.endedInOvertime,
        overtimes: dto.overtimes,
      },
    });

    await this.txHost.tx.gameParticipant.update({
      where: { id: awayParticipant.id },
      data: {
        score: dto.awayScore,
        isWinner: !newHomeWon,
      },
    });

    await this.txHost.tx.gameParticipant.update({
      where: { id: homeParticipant.id },
      data: {
        score: dto.homeScore,
        isWinner: newHomeWon,
      },
    });

    if (!isAlreadyFinalized || isDifferentWinner) {
      const updatedGame = await this.txHost.tx.game.findUniqueOrThrow({
        where: { id: game.id },
        select: {
          seasonId: true,
          isConferenceGame: true,
          isNeutralSite: true,
          gameParticipants: {
            select: {
              teamId: true,
              role: true,
              isWinner: true,
            },
          },
        },
      });

      await this.applyGameStats(updatedGame);

      await this.recalculateTeamStreak(awayParticipant.teamId, game.seasonId);
      await this.recalculateTeamStreak(homeParticipant.teamId, game.seasonId);
    }

    const finalizedGame = await this.txHost.tx.game.findUniqueOrThrow({
      where,
      include: GAME_INCLUDE,
    });
    return adaptGameToDto(finalizedGame);
  }

  @Transactional()
  async unfinalizeGame(identifier: string): Promise<GameResponseDto> {
    const where = parseIdentifier(identifier);

    const game = await this.txHost.tx.game.findUniqueOrThrow({
      where,
      select: {
        id: true,
        status: true,
        isConferenceGame: true,
        isNeutralSite: true,
        seasonId: true,
        gameParticipants: {
          select: {
            id: true,
            teamId: true,
            role: true,
            score: true,
            isWinner: true,
          },
        },
      },
    });

    if (game.status !== GameStatus.FINAL) {
      throw new BadRequestException('Game is not finalized');
    }

    await this.undoGameStats(game);

    await this.txHost.tx.game.update({
      where: { id: game.id },
      data: {
        status: GameStatus.SCHEDULED,
        endedInOvertime: false,
        overtimes: null,
      },
    });

    await this.txHost.tx.gameParticipant.updateMany({
      where: { gameId: game.id },
      data: { score: null, isWinner: null },
    });

    const awayParticipant = game.gameParticipants.find(
      participant => participant.role === ParticipantRole.AWAY,
    );
    const homeParticipant = game.gameParticipants.find(
      participant => participant.role === ParticipantRole.HOME,
    );

    await this.recalculateTeamStreak(awayParticipant.teamId, game.seasonId);
    await this.recalculateTeamStreak(homeParticipant.teamId, game.seasonId);

    const unfinalizedGame = await this.txHost.tx.game.findUniqueOrThrow({
      where,
      include: GAME_INCLUDE,
    });
    return adaptGameToDto(unfinalizedGame);
  }

  private async applyGameStats(game: {
    seasonId: number;
    isConferenceGame: boolean;
    isNeutralSite: boolean;
    gameParticipants: Array<{
      teamId: number;
      role: ParticipantRole;
      isWinner: boolean;
    }>;
  }): Promise<void> {
    for (const participant of game.gameParticipants) {
      const isHome = participant.role === ParticipantRole.HOME;
      const won = participant.isWinner;

      await this.txHost.tx.teamSeasonStat.upsert({
        where: {
          teamId_seasonId: {
            teamId: participant.teamId,
            seasonId: game.seasonId,
          },
        },
        update: {
          wins: { increment: won ? 1 : 0 },
          losses: { increment: won ? 0 : 1 },
          homeWins: { increment: isHome && !game.isNeutralSite && won ? 1 : 0 },
          homeLosses: {
            increment: isHome && !game.isNeutralSite && !won ? 1 : 0,
          },
          awayWins: {
            increment: !isHome && !game.isNeutralSite && won ? 1 : 0,
          },
          awayLosses: {
            increment: !isHome && !game.isNeutralSite && !won ? 1 : 0,
          },
          neutralWins: { increment: game.isNeutralSite && won ? 1 : 0 },
          neutralLosses: { increment: game.isNeutralSite && !won ? 1 : 0 },
          conferenceWins: { increment: game.isConferenceGame && won ? 1 : 0 },
          conferenceLosses: {
            increment: game.isConferenceGame && !won ? 1 : 0,
          },
        },
        create: {
          teamId: participant.teamId,
          seasonId: game.seasonId,
          wins: won ? 1 : 0,
          losses: won ? 0 : 1,
          homeWins: isHome && !game.isNeutralSite && won ? 1 : 0,
          homeLosses: isHome && !game.isNeutralSite && !won ? 1 : 0,
          awayWins: !isHome && !game.isNeutralSite && won ? 1 : 0,
          awayLosses: !isHome && !game.isNeutralSite && !won ? 1 : 0,
          neutralWins: game.isNeutralSite && won ? 1 : 0,
          neutralLosses: game.isNeutralSite && !won ? 1 : 0,
          conferenceWins: game.isConferenceGame && won ? 1 : 0,
          conferenceLosses: game.isConferenceGame && !won ? 1 : 0,
        },
      });
    }
  }

  private async undoGameStats(game: {
    id: number;
    seasonId: number;
    isConferenceGame: boolean;
    isNeutralSite: boolean;
    gameParticipants: Array<{
      teamId: number;
      role: ParticipantRole;
      isWinner: boolean;
    }>;
  }): Promise<void> {
    for (const participant of game.gameParticipants) {
      const isHome = participant.role === ParticipantRole.HOME;
      const won = participant.isWinner;

      await this.txHost.tx.teamSeasonStat.updateMany({
        where: {
          teamId: participant.teamId,
          seasonId: game.seasonId,
        },
        data: {
          wins: { decrement: won ? 1 : 0 },
          losses: { decrement: won ? 0 : 1 },
          homeWins: { decrement: isHome && !game.isNeutralSite && won ? 1 : 0 },
          homeLosses: {
            decrement: isHome && !game.isNeutralSite && !won ? 1 : 0,
          },
          awayWins: {
            decrement: !isHome && !game.isNeutralSite && won ? 1 : 0,
          },
          awayLosses: {
            decrement: !isHome && !game.isNeutralSite && !won ? 1 : 0,
          },
          neutralWins: { decrement: game.isNeutralSite && won ? 1 : 0 },
          neutralLosses: { decrement: game.isNeutralSite && !won ? 1 : 0 },
          conferenceWins: {
            decrement: game.isConferenceGame && won ? 1 : 0,
          },
          conferenceLosses: {
            decrement: game.isConferenceGame && !won ? 1 : 0,
          },
        },
      });
    }
  }

  private async recalculateTeamStreak(
    teamId: number,
    seasonId: number,
  ): Promise<void> {
    const games = await this.txHost.tx.game.findMany({
      where: {
        seasonId,
        status: GameStatus.FINAL,
        gameParticipants: {
          some: { teamId },
        },
      },
      include: {
        gameParticipants: {
          where: { teamId },
          select: { isWinner: true },
        },
      },
      orderBy: { date: 'asc' },
    });

    let currentStreak = 0;
    let streakType: StreakType = StreakType.WIN;

    for (const game of games) {
      const participant = game.gameParticipants[0];
      const won = participant.isWinner;

      if (currentStreak === 0) {
        currentStreak = 1;
        streakType = won ? StreakType.WIN : StreakType.LOSS;
      } else if (
        (won && streakType === StreakType.WIN) ||
        (!won && streakType === StreakType.LOSS)
      ) {
        currentStreak++;
      } else {
        currentStreak = 1;
        streakType = won ? StreakType.WIN : StreakType.LOSS;
      }
    }

    await this.txHost.tx.teamSeasonStat.updateMany({
      where: {
        teamId,
        seasonId,
      },
      data: {
        streak: currentStreak,
        streakType,
      },
    });
  }

  private generateSlug(
    date: string,
    awayAbbreviation: string,
    homeAbbreviation: string,
  ): string {
    return `${date.split('T')[0]}-${awayAbbreviation}-${homeAbbreviation}`.toLowerCase();
  }
}
