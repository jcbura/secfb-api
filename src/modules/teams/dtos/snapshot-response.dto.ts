import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SnapshotResponseDto {
  @ApiProperty()
  id: number;

  @ApiPropertyOptional()
  wins?: number;

  @ApiPropertyOptional()
  losses?: number;

  @ApiPropertyOptional()
  conferenceWins?: number;

  @ApiPropertyOptional()
  conferenceLosses?: number;

  @ApiPropertyOptional()
  homeWins?: number;

  @ApiPropertyOptional()
  homeLosses?: number;

  @ApiPropertyOptional()
  awayWins?: number;

  @ApiPropertyOptional()
  awayLosses?: number;

  @ApiPropertyOptional()
  neutralWins?: number;

  @ApiPropertyOptional()
  neutralLosses?: number;

  @ApiPropertyOptional()
  streak?: number;

  @ApiPropertyOptional()
  isWinStreak?: boolean;

  @ApiPropertyOptional()
  conferenceRank?: number;

  @ApiPropertyOptional()
  totalDefense?: number;

  @ApiPropertyOptional()
  totalOffense?: number;

  @ApiPropertyOptional()
  apPoll?: number;

  @ApiPropertyOptional()
  coachesPoll?: number;

  @ApiPropertyOptional()
  cfpRank?: number;

  @ApiPropertyOptional()
  footballPowerIndex?: number;

  @ApiPropertyOptional()
  strengthOfRecord?: number;

  @ApiPropertyOptional()
  strengthOfSchedule?: number;

  @ApiPropertyOptional()
  remainingStrengthOfSchedule?: number;

  @ApiProperty()
  teamId: number;

  @ApiProperty()
  seasonId: number;
}
