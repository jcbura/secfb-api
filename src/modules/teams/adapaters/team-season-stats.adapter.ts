import { TeamSeasonStatResponseDto } from '@/modules/teams/dtos';
import { TeamSeasonStat } from '@prisma/client';

export const adaptTeamSeasonStatToDto = (
  teamSeasonStat: TeamSeasonStat,
): TeamSeasonStatResponseDto => {
  return {
    id: teamSeasonStat.id,
    wins: teamSeasonStat.wins,
    losses: teamSeasonStat.losses,
    conferenceWins: teamSeasonStat.conferenceWins,
    conferenceLosses: teamSeasonStat.conferenceLosses,
    homeWins: teamSeasonStat.homeWins,
    homeLosses: teamSeasonStat.homeLosses,
    awayWins: teamSeasonStat.awayWins,
    awayLosses: teamSeasonStat.awayLosses,
    neutralWins: teamSeasonStat.neutralWins,
    neutralLosses: teamSeasonStat.neutralLosses,
    streak: teamSeasonStat.streak,
    streakType: teamSeasonStat.streakType,
    conferenceRank: teamSeasonStat.conferenceRank,
    apRank: teamSeasonStat.apRank,
    cfpRank: teamSeasonStat.cfpRank,
  };
};
