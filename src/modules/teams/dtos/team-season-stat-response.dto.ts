import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StreakType } from '@prisma/client';

export class TeamSeasonStatResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  wins: number;

  @ApiProperty()
  losses: number;

  @ApiProperty()
  conferenceWins: number;

  @ApiProperty()
  conferenceLosses: number;

  @ApiProperty()
  homeWins: number;

  @ApiProperty()
  homeLosses: number;

  @ApiProperty()
  awayWins: number;

  @ApiProperty()
  awayLosses: number;

  @ApiProperty()
  neutralWins: number;

  @ApiProperty()
  neutralLosses: number;

  @ApiProperty()
  streak: number;

  @ApiProperty({ enum: StreakType })
  streakType: StreakType;

  @ApiPropertyOptional()
  conferenceRank?: number;

  @ApiPropertyOptional()
  apRank?: number;

  @ApiPropertyOptional()
  cfpRank?: number;
}
