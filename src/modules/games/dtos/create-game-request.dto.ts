import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateGameRequestDto {
  @ApiPropertyOptional({ type: String, example: 'Iron Bowl' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, example: new Date().toISOString() })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  isTimeTBD: boolean;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 0, maximum: 16 })
  @IsNumber()
  @Min(0)
  @Max(16)
  @IsOptional()
  weekNumber?: number;

  @ApiPropertyOptional({ type: Number, example: 101821, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  attendance?: number;

  @ApiProperty({ enum: GameType, example: GameType.REGULAR_SEASON })
  @IsEnum(GameType)
  gameType: GameType;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  isConferenceGame: boolean;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  isNeutralSite: boolean;

  @ApiProperty({ enum: GameStatus, example: GameStatus.SCHEDULED })
  @IsEnum(GameStatus)
  status: GameStatus;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  endedInOvertime: boolean;

  @ApiPropertyOptional({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  overtimes?: number;

  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  seasonId: number;

  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  stadiumId: number;
}
