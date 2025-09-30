import { applyDecorators } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

export function Identifier(
  slugExample: string,
  paramName: string = 'identifier',
) {
  return applyDecorators(
    ApiParam({
      name: paramName,
      type: String,
      examples: {
        id: { value: '1', summary: 'id' },
        slug: {
          value: slugExample,
          summary: 'slug',
        },
      },
    }),
  );
}
