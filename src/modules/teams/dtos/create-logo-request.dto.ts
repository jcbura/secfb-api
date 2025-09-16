import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateLogoRequestDto {
  @ApiProperty({
    type: String,
    example: 'https://a.espncdn.com/i/teamlogos/ncaa/500/333.png',
  })
  @IsUrl()
  @IsNotEmpty()
  url: string;

  @ApiProperty({
    type: String,
    example: 'https://a.espncdn.com/i/teamlogos/ncaa/500-dark/333.png',
  })
  @IsUrl()
  @IsNotEmpty()
  darkUrl: string;

  @ApiProperty({ type: Number, example: 500, minimum: 1 })
  @IsNumber()
  @Min(1)
  width: 500;

  @ApiProperty({ type: Number, example: 500, minimum: 1 })
  @IsNumber()
  @Min(1)
  height: number;

  @ApiProperty({ type: String, example: 'Alabama Crimson Tide Logo' })
  @IsString()
  @IsNotEmpty()
  alt: string;

  @ApiProperty({ type: Number, example: 1, minimum: 1 })
  @IsNumber()
  @Min(1)
  teamId: number;
}
