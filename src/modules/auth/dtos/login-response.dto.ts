import { withBaseResponse } from '@/common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  access_token: string;
}

export class BaseLoginResponseDto extends withBaseResponse(LoginResponseDto) {}
export class BaseRefreshResponseDto extends withBaseResponse(
  LoginResponseDto,
) {}
