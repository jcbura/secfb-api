import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class CreatePerformanceDto {
  @ApiPropertyOptional({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  conferenceRank?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 25 })
  @IsNumber()
  @Min(1)
  @Max(25)
  @IsOptional()
  apPoll?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 25 })
  @IsNumber()
  @Min(1)
  @Max(25)
  @IsOptional()
  coachesPoll?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 25 })
  @IsNumber()
  @Min(1)
  @Max(25)
  @IsOptional()
  cfpRank?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  totalDefense?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  totalOffense?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  footballPowerIndex?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  strengthOfRecord?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  strengthOfSchedule?: number;

  @ApiPropertyOptional({ type: Number, minimum: 1, maximum: 136 })
  @IsNumber()
  @Min(1)
  @Max(136)
  @IsOptional()
  remainingStrengthOfSchedule?: number;
}
