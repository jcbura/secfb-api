import { ApiOrderBy, ApiSortOrder, SortOrder } from '@/common/decorators';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Conference, Prisma } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';

const ORDER_BY = {
  DISPLAY_NAME: 'displayName',
  SHORT_DISPLAY_NAME: 'shortDisplayName',
  ABBREVIATION: 'abbreviation',
  MASCOT: 'mascot',
  CONFERENCE: 'conference',
} as const;

type OrderBy = (typeof ORDER_BY)[keyof typeof ORDER_BY];

export class QueryTeamDto {
  @ApiPropertyOptional({ enum: Conference })
  @IsEnum(Conference)
  @IsOptional()
  conference?: Conference;

  @ApiOrderBy(ORDER_BY)
  orderBy?: OrderBy;

  @ApiSortOrder()
  sortOrder?: SortOrder;

  toWhereInput(): Prisma.TeamWhereInput {
    const where: Prisma.TeamWhereInput = {};

    if (this.conference) where.conference = this.conference;

    return where;
  }

  toOrderByInput(): Prisma.TeamOrderByWithRelationInput[] {
    const order = this.sortOrder || SortOrder.ASC;

    switch (this.orderBy) {
      case ORDER_BY.DISPLAY_NAME:
        return [{ displayName: order }];
      case ORDER_BY.SHORT_DISPLAY_NAME:
        return [{ shortDisplayName: order }];
      case ORDER_BY.ABBREVIATION:
        return [{ abbreviation: order }];
      case ORDER_BY.MASCOT:
        return [{ mascot: order }, { displayName: order }];
      case ORDER_BY.CONFERENCE:
        return [{ conference: order }, { displayName: order }];
      default:
        return [{ id: order }];
    }
  }
}
