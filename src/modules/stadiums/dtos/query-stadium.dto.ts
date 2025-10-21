import { ApiOrderBy, ApiSortOrder, SortOrder } from '@/common/decorators';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { IsOptional, IsString } from 'class-validator';

const ORDER_BY = {
  NAME: 'name',
  CITY: 'city',
  STATE: 'state',
} as const;

type OrderBy = (typeof ORDER_BY)[keyof typeof ORDER_BY];

export class QueryStadiumDto {
  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiOrderBy(ORDER_BY)
  orderBy?: OrderBy;

  @ApiSortOrder()
  sortOrder?: SortOrder;

  toWhereInput(): Prisma.StadiumWhereInput {
    const where: Prisma.StadiumWhereInput = {};

    if (this.city) where.city = this.city;
    if (this.state) where.state = this.state;

    return where;
  }

  toOrderByInput(): Prisma.StadiumOrderByWithRelationInput[] {
    const order = this.sortOrder ?? SortOrder.ASC;

    switch (this.orderBy) {
      case ORDER_BY.NAME:
        return [{ name: order }, { state: order }, { city: order }];
      case ORDER_BY.CITY:
        return [{ city: order }, { name: order }];
      case ORDER_BY.STATE:
        return [{ state: order }, { city: order }];
      default:
        return [{ id: order }];
    }
  }
}
