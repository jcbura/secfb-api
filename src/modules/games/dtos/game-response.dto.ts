import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { SeasonResponseDto } from '@/modules/seasons/dtos';
import { StadiumResponseDto } from '@/modules/stadiums/dtos';
import { LogoResponseDto } from '@/modules/teams/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Conference, GameStatus, GameType } from '@prisma/client';

class TeamInGameDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  shortDisplayName: string;

  @ApiProperty()
  abbreviation: string;

  @ApiProperty()
  mascot: string;

  @ApiProperty({ enum: Conference })
  conference: Conference;

  @ApiPropertyOptional({ type: () => LogoResponseDto })
  logo?: LogoResponseDto;

  @ApiPropertyOptional()
  score?: number;

  @ApiPropertyOptional()
  isWinner?: boolean;

  @ApiPropertyOptional()
  apRank?: number;

  @ApiPropertyOptional()
  cfpRank?: number;
}

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

  @ApiProperty({ enum: GameStatus })
  status: GameStatus;

  @ApiPropertyOptional()
  weekNumber?: number;

  @ApiProperty({ enum: GameType })
  gameType: GameType;

  @ApiProperty()
  isConferenceGame: boolean;

  @ApiProperty()
  isNeutralSite: boolean;

  @ApiProperty()
  endedInOvertime: boolean;

  @ApiPropertyOptional()
  overtimes?: number;

  @ApiProperty({ type: () => SeasonResponseDto })
  season: SeasonResponseDto;

  @ApiProperty({ type: () => StadiumResponseDto })
  stadium: StadiumResponseDto;

  @ApiProperty({ type: TeamInGameDto })
  awayTeam: TeamInGameDto;

  @ApiProperty({ type: TeamInGameDto })
  homeTeam: TeamInGameDto;
}

export class BaseGameResponseDto extends withBaseResponse(GameResponseDto) {}
export class BaseArrayGameResponseDto extends withBaseArrayResponse(
  GameResponseDto,
) {}
