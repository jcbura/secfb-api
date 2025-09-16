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

  @ApiProperty()
  conference: Conference;

  @ApiPropertyOptional()
  stadiumId?: number;
}
