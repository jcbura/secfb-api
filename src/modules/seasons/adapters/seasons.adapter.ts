import { SeasonResponseDto } from '@/modules/seasons/dtos';
import { Season } from '@prisma/client';

export const adaptSeasonToDto = (season: Season): SeasonResponseDto => {
  return {
    id: season.id,
    slug: season.slug,
    name: season.name,
    startDate: season.startDate.toISOString(),
    endDate: season.endDate.toISOString(),
    isCurrentSeason: season.isCurrentSeason,
    isCfpRankAvailable: season.isCfpRankAvailable,
  };
};

export const adaptSeasonsToDto = (seasons: Season[]): SeasonResponseDto[] => {
  return seasons.map(season => adaptSeasonToDto(season));
};
