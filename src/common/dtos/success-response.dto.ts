import { BaseResponseDto } from '@/common/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<
  T = Record<string, unknown>,
> extends BaseResponseDto {
  @ApiProperty()
  result: T;
}
