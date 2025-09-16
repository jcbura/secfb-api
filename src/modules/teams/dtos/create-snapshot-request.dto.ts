import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreateSnapshotRequestDto {
  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  wins?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  losses?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  conferenceWins?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  conferenceLosses?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  homeWins?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  homeLosses?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  awayWins?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  awayLosses?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  neutralWins?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  neutralLosses?: number;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  streak?: number;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsBoolean()
  @IsOptional()
  isWinStreak?: boolean;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  conferenceRank?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  totalDefense?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  totalOffense?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 25 })
  @IsNumber()
  @Min(1)
  @Max(25)
  @IsOptional()
  apPoll?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 25 })
  @IsNumber()
  @Min(1)
  @Max(25)
  @IsOptional()
  coachesPoll?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 25 })
  @IsNumber()
  @Min(1)
  @Max(25)
  @IsOptional()
  cfpRank?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  footballPowerIndex?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  strengthOfRecord?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  strengthOfSchedule?: number;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  remainingStrengthOfSchedule?: number;

  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  teamId: number;

  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  seasonId: number;
}
