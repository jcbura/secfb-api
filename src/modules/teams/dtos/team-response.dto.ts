import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { StadiumResponseDto } from '@/modules/stadiums/dtos';
import {
  LogoResponseDto,
  TeamSeasonStatResponseDto,
} from '@/modules/teams/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Conference } from '@prisma/client';

export class TeamResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  shortDisplayName: string;

  @ApiProperty()
  abbreviation: string;

  @ApiProperty()
  mascot: string;

  @ApiProperty({ enum: Conference })
  conference: Conference;

  @ApiPropertyOptional({ type: () => StadiumResponseDto })
  stadium?: StadiumResponseDto;

  @ApiPropertyOptional({ type: () => LogoResponseDto })
  logo?: LogoResponseDto;

  @ApiPropertyOptional({ type: () => TeamSeasonStatResponseDto })
  stats?: TeamSeasonStatResponseDto;
}

export class BaseTeamResponseDto extends withBaseResponse(TeamResponseDto) {}
export class BaseArrayTeamResponseDto extends withBaseArrayResponse(
  TeamResponseDto,
) {}
