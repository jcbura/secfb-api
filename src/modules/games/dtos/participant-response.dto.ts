import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ParticipantResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  isHomeTeam: boolean;

  @ApiPropertyOptional()
  score?: number;

  @ApiPropertyOptional()
  isWinner?: boolean;

  @ApiProperty()
  gameId: number;

  @ApiProperty()
  teamId: number;
}
