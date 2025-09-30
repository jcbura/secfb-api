import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateStadiumDto {
  @ApiProperty({ type: String, example: 'Bryant-Denny Stadium' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ type: String, example: 'Saban Field' })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  field?: string;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  nickname?: string;

  @ApiProperty({ type: String, example: 'Tuscaloosa' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, example: 'AL' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({ type: Number, minimum: 0, example: 101821 })
  @IsNumber()
  @Min(0)
  @IsOptional()
  capacity?: number;
}
