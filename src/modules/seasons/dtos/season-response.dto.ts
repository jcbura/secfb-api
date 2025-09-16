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
