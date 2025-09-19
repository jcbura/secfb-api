import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateParticipantRequestDto {
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isHomeTeam: boolean;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  score?: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  isWinner?: boolean;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  gameId: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  teamId: number;
}
