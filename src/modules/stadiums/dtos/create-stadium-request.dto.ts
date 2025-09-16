import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateStadiumRequestDto {
  @ApiProperty({ type: String, example: 'Bryant-Denny Stadium' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ type: String, example: 'Death Valley' })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiPropertyOptional({ type: String, example: 'Saban Field' })
  @IsString()
  @IsOptional()
  field?: string;

  @ApiProperty({ type: String, example: 'Tuscaloosa' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, example: 'AL' })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiPropertyOptional({ type: Number, example: 101821, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  capacity?: number;
}
