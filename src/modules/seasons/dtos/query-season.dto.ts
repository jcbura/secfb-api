import { ApiOrderBy, ApiSortOrder, SortOrder } from '@/common/decorators';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';

const ORDER_BY = {
  START_DATE: 'startDate',
  NAME: 'name',
} as const;

type OrderBy = (typeof ORDER_BY)[keyof typeof ORDER_BY];

export class QuerySeasonDto {
  @ApiPropertyOptional({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  isCurrentSeason?: boolean;

  @ApiOrderBy(ORDER_BY)
  orderBy?: OrderBy;

  @ApiSortOrder()
  sortOrder?: SortOrder;

  toWhereInput(): Prisma.SeasonWhereInput {
    const where: Prisma.SeasonWhereInput = {};

    if (this.isCurrentSeason) where.isCurrentSeason = this.isCurrentSeason;

    return where;
  }

  toOrderByInput(): Prisma.SeasonOrderByWithRelationInput[] {
    const order = this.sortOrder || SortOrder.ASC;

    switch (this.orderBy) {
      case ORDER_BY.START_DATE:
        return [{ startDate: order }];
      case ORDER_BY.NAME:
        return [{ name: order }];
      default:
        return [{ id: order }];
    }
  }
}
