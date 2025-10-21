import { StadiumResponseDto } from '@/modules/stadiums/dtos';
import { Stadium } from '@prisma/client';

export const adaptStadiumToDto = (stadium: Stadium): StadiumResponseDto => {
  return {
    id: stadium.id,
    slug: stadium.slug,
    name: stadium.name,
    city: stadium.city,
    state: stadium.state,
  };
};

export const adaptStadiumsToDto = (
  stadiums: Stadium[],
): StadiumResponseDto[] => {
  return stadiums.map(stadium => adaptStadiumToDto(stadium));
};
