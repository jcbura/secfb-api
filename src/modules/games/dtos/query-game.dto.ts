import { ApiOrderBy, ApiSortOrder, SortOrder } from '@/common/decorators';
import { parseIdentifier } from '@/common/utils';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { GameStatus, GameType, Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

const ORDER_BY = {
  DATE: 'date',
  WEEK_NUMBER: 'weekNumber',
  NAME: 'name',
} as const;

type OrderBy = (typeof ORDER_BY)[keyof typeof ORDER_BY];

export class QueryGameDto {
  @ApiPropertyOptional({ enum: GameStatus })
  @IsEnum(GameStatus)
  @IsOptional()
  status?: GameStatus;

  @ApiPropertyOptional({ type: Number, minimum: 0, maximum: 16 })
  @IsNumber()
  @Min(0)
  @Max(16)
  @IsOptional()
  @Type(() => Number)
  weekNumber?: number;

  @ApiPropertyOptional({ enum: GameType })
  @IsEnum(GameType)
  @IsOptional()
  gameType?: GameType;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isConferenceGame?: boolean;

  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isCurrentSeason?: boolean;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  seasonIdentifier?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  teamIdentifier?: string;

  @ApiOrderBy(ORDER_BY)
  orderBy?: OrderBy;

  @ApiSortOrder()
  sortOrder?: SortOrder;

  toWhereInput(): Prisma.GameWhereInput {
    const where: Prisma.GameWhereInput = {};

    if (this.status) where.status = this.status;
    if (this.weekNumber) where.weekNumber = this.weekNumber;
    if (this.gameType) where.gameType = this.gameType;
    if (this.isConferenceGame) where.isConferenceGame = this.isConferenceGame;
    if (this.isCurrentSeason) {
      where.season = { isCurrentSeason: true };
    } else if (this.seasonIdentifier) {
      where.season = parseIdentifier(this.seasonIdentifier);
    }
    if (this.teamIdentifier) {
      where.gameParticipants = {
        some: { team: parseIdentifier(this.teamIdentifier) },
      };
    }

    return where;
  }

  toOrderByInput(): Prisma.GameOrderByWithRelationInput[] {
    const order = this.sortOrder || SortOrder.ASC;

    switch (this.orderBy) {
      case ORDER_BY.DATE:
        return [{ date: order }];
      case ORDER_BY.WEEK_NUMBER:
        return [{ weekNumber: order }, { date: order }];
      case ORDER_BY.NAME:
        return [{ name: order }];
      default:
        return [{ id: order }];
    }
  }
}
