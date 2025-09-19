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

  @ApiProperty({ type: String, example: '2025-11-29T00:00' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isTimeTBD: boolean;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 16 })
  @IsNumber()
  @Min(0)
  @Max(16)
  @IsOptional()
  weekNumber?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  attendance?: number;

  @ApiProperty({ enum: GameType })
  @IsEnum(GameType)
  gameType: GameType;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isConferenceGame: boolean;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isNeutralSite: boolean;

  @ApiProperty({ enum: GameStatus })
  @IsEnum(GameStatus)
  status: GameStatus;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  endedInOvertime: boolean;

  @ApiPropertyOptional({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  overtimes?: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  seasonId: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  stadiumId: number;
}
