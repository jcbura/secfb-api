import { ErrorResponseDto, SuccessResponseDto } from '@/common/dtos';
import { mixin } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptions } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export const generateErrorResponse = <T = Record<string, unknown>>(
  timestamp: string = new Date().toISOString(),
  path: string,
  statusCode: number = 400,
  message: string = 'error',
  cause?: T,
): ErrorResponseDto<T> => {
  return { timestamp, path, statusCode, message, cause };
};

export const generateSuccessResponse = <T = Record<string, unknown>>(
  timestamp: string = new Date().toISOString(),
  path: string,
  statusCode: number = 200,
  message: string = 'success',
  result?: T,
): SuccessResponseDto<T> => {
  return { timestamp, path, statusCode, message, result };
};

type Constructor<T = object> = new (...args: any[]) => T;

export function withBaseResponse<BaseType extends Constructor>(
  Base: BaseType,
  options?: ApiPropertyOptions | undefined,
) {
  class ResponseDto {
    @ApiProperty({
      example: new Date().toISOString(),
    })
    timestamp: string;

    @ApiProperty()
    path: string;

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty({
      type: () => Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested()
    result: InstanceType<BaseType>;
  }

  return mixin(ResponseDto);
}

export function withBaseArrayResponse<BaseType extends Constructor>(
  Base: BaseType,
  options?: ApiPropertyOptions | undefined,
) {
  class ResponseDto {
    @ApiProperty({
      example: new Date().toISOString(),
    })
    timestamp: string;

    @ApiProperty()
    path: string;

    @ApiProperty()
    statusCode: number;

    @ApiProperty()
    message: string;

    @ApiProperty({
      isArray: true,
      type: () => Base,
      ...options,
    })
    @Type(() => Base)
    @ValidateNested({ each: true })
    result: Array<InstanceType<BaseType>>;
  }

  return mixin(ResponseDto);
}
