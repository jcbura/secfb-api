import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateSeasonRequestDto {
  @ApiProperty({ type: String, example: '2025-2026' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: new Date().toISOString() })
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({ type: String, example: new Date().toISOString() })
  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({ type: Boolean, example: true })
  @IsBoolean()
  isCurrentSeason: boolean;
}
