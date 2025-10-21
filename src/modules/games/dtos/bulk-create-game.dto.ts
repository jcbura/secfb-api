import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  ValidateIf,
  ValidateNested,
} from 'class-validator';

class BulkCreateGameDto {
  @ApiProperty({ type: String, example: 'Iron Bowl' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ type: String, example: '2025-11-29T00:00' })
  @IsDateString()
  date: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isTimeTBD: boolean;

  @ApiProperty({ enum: GameStatus, example: GameStatus.SCHEDULED })
  @IsEnum(GameStatus)
  status: GameStatus;

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

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  @ValidateIf(o => o.status === GameStatus.FINAL)
  awayScore?: number;

  @ApiPropertyOptional({ type: Number, minimum: 0 })
  @IsNumber()
  @Min(0)
  @ValidateIf(o => o.status === GameStatus.FINAL)
  homeScore?: number;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  endedInOvertime?: boolean;

  @ApiPropertyOptional({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  overtimes?: number;
}

export class BulkCreateGamesDto {
  @ApiProperty({ type: [BulkCreateGameDto], minItems: 1 })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => BulkCreateGameDto)
  @ArrayMinSize(1)
  games: BulkCreateGameDto[];
}
