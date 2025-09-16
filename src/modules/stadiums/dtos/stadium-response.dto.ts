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
