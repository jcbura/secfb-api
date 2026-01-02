import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameType } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateGameDto {
  @ApiProperty({ type: String, example: 'Iron Bowl' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, example: '2025-11-29T00:00' })
  @IsDateString()
  date: string;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 16, example: 14 })
  @IsNumber()
  @Min(0)
  @Max(16)
  @IsOptional()
  weekNumber?: number;

  @ApiProperty({ enum: GameType })
  @IsEnum(GameType)
  gameType: GameType;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isConferenceGame: boolean;

  @ApiProperty({ type: Boolean, example: false })
  @IsBoolean()
  isNeutralSite: boolean;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  seasonId: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  stadiumId: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  awayTeamId: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  homeTeamId: number;
}
