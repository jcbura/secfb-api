import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class StadiumResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;
}

export class BaseStadiumResponseDto extends withBaseResponse(
  StadiumResponseDto,
) {}
export class BaseArrayStadiumResponseDto extends withBaseArrayResponse(
  StadiumResponseDto,
) {}
