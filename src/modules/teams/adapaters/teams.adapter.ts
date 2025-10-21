import { adaptStadiumToDto } from '@/modules/stadiums/adapters';
import {
  adaptLogoToDto,
  adaptTeamSeasonStatToDto,
} from '@/modules/teams/adapaters';
import { TeamResponseDto } from '@/modules/teams/dtos';
import { Prisma } from '@prisma/client';

export const TEAM_INCLUDE = {
  logo: true,
  stadium: true,
  teamSeasonStats: {
    where: { season: { isCurrentSeason: true } },
    take: 1,
  },
} as const satisfies Prisma.TeamInclude;

export type TeamWithRelation = Prisma.TeamGetPayload<{
  include: typeof TEAM_INCLUDE;
}>;

export const adaptTeamToDto = (team: TeamWithRelation): TeamResponseDto => {
  return {
    id: team.id,
    slug: team.slug,
    displayName: team.displayName,
    shortDisplayName: team.shortDisplayName,
    abbreviation: team.abbreviation,
    mascot: team.mascot,
    conference: team.conference,
    stadium: team.stadium ? adaptStadiumToDto(team.stadium) : null,
    logo: team.logo ? adaptLogoToDto(team.logo) : null,
    stats: team.teamSeasonStats[0]
      ? adaptTeamSeasonStatToDto(team.teamSeasonStats[0])
      : null,
  };
};

export const adaptTeamsToDto = (
  teams: TeamWithRelation[],
): TeamResponseDto[] => {
  return teams.map(team => adaptTeamToDto(team));
};
