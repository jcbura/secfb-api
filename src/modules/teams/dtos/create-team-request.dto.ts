import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Conference } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateIf,
} from 'class-validator';

export class CreateTeamRequestDto {
  @ApiProperty({ type: String, example: 'Alabama Crimson Tide' })
  @IsString()
  @IsNotEmpty()
  displayName: string;

  @ApiProperty({ type: String, example: 'Alabama' })
  @IsString()
  @IsNotEmpty()
  shortDisplayName: string;

  @ApiProperty({ type: String, example: 'ALA' })
  @IsString()
  @IsNotEmpty()
  abbreviation: string;

  @ApiProperty({ type: String, example: 'Crimson Tide' })
  @IsString()
  @IsNotEmpty()
  mascot: string;

  @ApiProperty({ enum: Conference, example: Conference.SEC })
  @IsEnum(Conference)
  conference: Conference;

  @ApiPropertyOptional({ type: Number, minimum: 1, nullable: true })
  @ValidateIf((_, value) => value !== null)
  @IsNumber()
  @Min(1)
  @IsOptional()
  stadiumId?: number | null;
}
