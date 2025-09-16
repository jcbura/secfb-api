import { BaseResponseDto } from '@/common/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto<
  T = Record<string, unknown>,
> extends BaseResponseDto {
  @ApiProperty()
  cause: T;
}
