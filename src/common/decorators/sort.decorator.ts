import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum SortOrder {
  ASC = 'asc',
  DESC = 'desc',
}

export function ApiSortOrder() {
  return applyDecorators(
    ApiPropertyOptional({ enum: SortOrder }),
    IsEnum(SortOrder),
    IsOptional(),
  );
}
