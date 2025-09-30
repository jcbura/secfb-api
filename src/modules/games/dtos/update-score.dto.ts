import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class UpdateScoreDto {
  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  awayScore: number;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  homeScore: number;
}
