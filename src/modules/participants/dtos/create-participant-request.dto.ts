import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateParticipantRequestDto {
  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  isHomeTeam: boolean;

  @ApiPropertyOptional({ type: Number, example: 0, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  score?: number;

  @ApiPropertyOptional({ type: Boolean, example: true })
  @IsBoolean()
  @IsOptional()
  isWinner?: boolean;

  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  gameId: number;

  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  teamId: number;
}
