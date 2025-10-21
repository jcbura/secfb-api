import { GameResponseDto } from '@/modules/games/dtos';
import { adaptSeasonToDto } from '@/modules/seasons/adapters';
import { adaptStadiumToDto } from '@/modules/stadiums/adapters';
import { adaptLogoToDto } from '@/modules/teams/adapaters';
import { ParticipantRole, Prisma } from '@prisma/client';

export const GAME_INCLUDE = {
  season: true,
  stadium: true,
  gameParticipants: {
    include: {
      team: {
        include: {
          logo: true,
          teamSeasonStats: {
            select: { seasonId: true, apRank: true, cfpRank: true },
          },
        },
      },
    },
  },
} as const satisfies Prisma.GameInclude;

export type GameWithRelation = Prisma.GameGetPayload<{
  include: typeof GAME_INCLUDE;
}>;

export const adaptGameToDto = (game: GameWithRelation): GameResponseDto => {
  const awayParticipant = game.gameParticipants.find(
    p => p.role === ParticipantRole.AWAY,
  );
  const homeParticipant = game.gameParticipants.find(
    p => p.role === ParticipantRole.HOME,
  );

  const awayStats = awayParticipant.team.teamSeasonStats.find(
    stat => stat.seasonId === game.seasonId,
  );
  const homeStats = homeParticipant.team.teamSeasonStats.find(
    stat => stat.seasonId === game.seasonId,
  );

  return {
    id: game.id,
    slug: game.slug,
    name: game.name ?? null,
    date: game.date.toISOString(),
    isTimeTBD: game.isTimeTBD,
    status: game.status,
    weekNumber: game.weekNumber ?? null,
    gameType: game.gameType,
    isConferenceGame: game.isConferenceGame,
    isNeutralSite: game.isNeutralSite,
    endedInOvertime: game.endedInOvertime,
    overtimes: game.overtimes ?? null,
    season: adaptSeasonToDto(game.season),
    stadium: adaptStadiumToDto(game.stadium),
    awayTeam: {
      id: awayParticipant.team.id,
      slug: awayParticipant.team.slug,
      displayName: awayParticipant.team.displayName,
      shortDisplayName: awayParticipant.team.shortDisplayName,
      abbreviation: awayParticipant.team.abbreviation,
      mascot: awayParticipant.team.mascot,
      conference: awayParticipant.team.conference,
      logo: awayParticipant.team.logo
        ? adaptLogoToDto(awayParticipant.team.logo)
        : null,
      score: awayParticipant.score ?? null,
      isWinner: awayParticipant.isWinner ?? null,
      apRank: awayStats?.apRank ?? null,
      cfpRank: awayStats?.cfpRank ?? null,
    },
    homeTeam: {
      id: homeParticipant.team.id,
      slug: homeParticipant.team.slug,
      displayName: homeParticipant.team.displayName,
      shortDisplayName: homeParticipant.team.shortDisplayName,
      abbreviation: homeParticipant.team.abbreviation,
      mascot: homeParticipant.team.mascot,
      conference: homeParticipant.team.conference,
      logo: homeParticipant.team.logo
        ? adaptLogoToDto(homeParticipant.team.logo)
        : null,
      score: homeParticipant.score ?? null,
      isWinner: homeParticipant.isWinner ?? null,
      apRank: homeStats?.apRank ?? null,
      cfpRank: homeStats?.cfpRank ?? null,
    },
  };
};

export const adaptGamesToDto = (
  games: GameWithRelation[],
): GameResponseDto[] => {
  return games.map(game => adaptGameToDto(game));
};
