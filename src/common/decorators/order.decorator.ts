import { applyDecorators } from '@nestjs/common';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export function ApiOrderBy(orderBy: Record<string, string>) {
  return applyDecorators(
    ApiPropertyOptional({ enum: Object.values(orderBy) }),
    IsEnum(orderBy),
    IsOptional(),
  );
}
