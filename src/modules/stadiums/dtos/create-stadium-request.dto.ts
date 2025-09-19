import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateStadiumRequestDto {
  @ApiProperty({ type: String, example: 'Sanford Stadium' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ type: String, example: 'Between the Hedges' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({ type: String, example: 'Dooley Field' })
  @IsString()
  @IsOptional()
  field?: string;

  @ApiProperty({ type: String, example: 'Athens' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, example: 'GA' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({ type: Number, minimum: 0, example: 92746 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  capacity?: number;
}
