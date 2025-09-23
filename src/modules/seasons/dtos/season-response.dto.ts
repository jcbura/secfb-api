import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { ApiProperty } from '@nestjs/swagger';

export class SeasonResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  isCurrentSeason: boolean;
}

export class BaseSeasonResponseDto extends withBaseResponse(
  SeasonResponseDto,
) {}
export class BaseArraySeasonResponseDto extends withBaseArrayResponse(
  SeasonResponseDto,
) {}
