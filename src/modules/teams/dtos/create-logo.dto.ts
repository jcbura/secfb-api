import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateLogoDto {
  @ApiProperty({ type: String })
  @IsUrl()
  url: string;

  @ApiProperty({ type: String })
  @IsUrl()
  darkUrl: string;

  @ApiProperty({ type: Number, minimum: 1, example: 500 })
  @IsNumber()
  @Min(1)
  width: number;

  @ApiProperty({ type: Number, minimum: 1, example: 500 })
  @IsNumber()
  @Min(1)
  height: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  alt: string;
}
