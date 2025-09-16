import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameType } from '@prisma/client';

export class GameResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiPropertyOptional()
  name?: string;

  @ApiProperty()
  date: string;

  @ApiProperty()
  isTimeTBD: boolean;

  @ApiPropertyOptional()
  weekNumber?: number;

  @ApiPropertyOptional()
  attendance?: number;

  @ApiProperty()
  gameType: GameType;

  @ApiProperty()
  isConferenceGame: boolean;

  @ApiProperty()
  isNeutralSite: boolean;

  @ApiProperty()
  status: GameStatus;

  @ApiProperty()
  endedInOvertime: boolean;

  @ApiPropertyOptional()
  overtimes?: number;

  @ApiProperty()
  seasonId: number;

  @ApiProperty()
  stadiumId: number;
}
