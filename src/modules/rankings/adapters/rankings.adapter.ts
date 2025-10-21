import {
  ConferenceRankingResponseDto,
  RankingResponseDto,
} from '@/modules/rankings/dtos';
import { Prisma } from '@prisma/client';

export const RANKING_SELECT = {
  conferenceRank: true,
  apRank: true,
  cfpRank: true,
  team: { select: { slug: true, displayName: true } },
} as const satisfies Prisma.TeamSeasonStatSelect;

export type Ranking = Prisma.TeamSeasonStatGetPayload<{
  select: typeof RANKING_SELECT;
}>;

export const adaptConferenceRankingsToDto = (
  rankings: Ranking[],
): ConferenceRankingResponseDto[] => {
  return rankings.map(ranking => {
    return {
      rank: ranking.conferenceRank,
      team: { slug: ranking.team.slug, displayName: ranking.team.displayName },
    };
  });
};

export const adaptRankingsToDto = (
  rankings: Ranking[],
  type: 'apRank' | 'cfpRank',
): RankingResponseDto[] => {
  const teamsByRank = new Map<number, { slug: string; displayName: string }>();

  rankings.forEach(ranking => {
    const rank = ranking[type];
    if (rank !== null) {
      teamsByRank.set(rank, {
        slug: ranking.team.slug,
        displayName: ranking.team.displayName,
      });
    }
  });

  return Array.from({ length: 25 }, (_, index) => {
    const rank = index + 1;
    const team = teamsByRank.get(rank);

    return {
      rank,
      team: team ? { slug: team.slug, displayName: team.displayName } : null,
    };
  });
};
