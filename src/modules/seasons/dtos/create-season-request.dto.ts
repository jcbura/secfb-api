import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateSeasonRequestDto {
  @ApiProperty({ type: String, example: '2025-2026' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: '2025-08-23T11:00' })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ type: String, example: '2026-01-19T18:30' })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  isCurrentSeason: boolean;
}
