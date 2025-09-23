import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class StadiumResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  nickname?: string;

  @ApiPropertyOptional()
  field?: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiPropertyOptional()
  capacity?: number;
}

export class BaseStadiumResponseDto extends withBaseResponse(
  StadiumResponseDto,
) {}
export class BaseArrayStadiumResponseDto extends withBaseArrayResponse(
  StadiumResponseDto,
) {}
