import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class FinalizeGameRequestDto {
  @ApiProperty({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  awayScore: number;

  @ApiProperty({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  homeScore: number;

  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  endedInOvertime: boolean;

  @ApiPropertyOptional({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  overtimes?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  attendance?: number;
}
