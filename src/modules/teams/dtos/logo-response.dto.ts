import { withBaseResponse } from '@/common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class LogoResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  darkUrl: string;

  @ApiProperty()
  width: number;

  @ApiProperty()
  height: number;

  @ApiProperty()
  alt: string;
}

export class BaseLogoResponseDto extends withBaseResponse(LogoResponseDto) {}
