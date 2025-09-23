import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateLogoRequestDto {
  @ApiProperty({
    type: String,
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: String,
  })
  @IsUrl()
  @IsNotEmpty()
  darkUrl: string;

  @ApiProperty({ type: Number, example: 500, minimum: 1 })
  @IsNumber()
  @Min(1)
  width: number;

  @ApiProperty({ type: Number, example: 500, minimum: 1 })
  @IsNumber()
  @Min(1)
  height: number;

  @ApiProperty({ type: String, example: 'Alabama Crimson Tide Logo' })
  @IsString()
  @IsNotEmpty()
  alt: string;
}
