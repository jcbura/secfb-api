import { LogoResponseDto } from '@/modules/teams/dtos';
import { Logo } from '@prisma/client';

export const adaptLogoToDto = (logo: Logo): LogoResponseDto => {
  return {
    id: logo.id,
    url: logo.url,
    darkUrl: logo.darkUrl,
    width: logo.width,
    height: logo.height,
    alt: logo.alt,
  };
};
