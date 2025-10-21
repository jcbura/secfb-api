import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateSeasonDto {
  @ApiProperty({ type: String, example: '2025-2026' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: '2025-08-23T11:00' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ type: String, example: '2026-01-19T18:30' })
  @IsDateString()
  endDate: string;
}

export class BulkCreateSeasonDto {
  @ApiProperty({ type: [CreateSeasonDto], minItems: 1 })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSeasonDto)
  @ArrayMinSize(1)
  seasons: CreateSeasonDto[];
}
