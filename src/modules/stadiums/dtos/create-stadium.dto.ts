import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CreateStadiumDto {
  @ApiProperty({ type: String, example: 'Bryant-Denny Stadium' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String, example: 'Tuscaloosa' })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({ type: String, example: 'AL' })
  @IsString()
  @IsNotEmpty()
  state: string;
}

export class BulkCreateStadiumDto {
  @ApiProperty({ type: [CreateStadiumDto], minItems: 1 })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStadiumDto)
  @ArrayMinSize(1)
  stadiums: CreateStadiumDto[];
}
