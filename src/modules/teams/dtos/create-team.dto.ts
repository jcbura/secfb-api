import { CreateLogoDto } from '@/modules/teams/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Conference } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class CreateTeamDto {
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

  @ApiPropertyOptional({ enum: Conference, example: Conference.SEC })
  @IsEnum(Conference)
  @IsOptional()
  conference: Conference;

  @ApiPropertyOptional({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  @IsOptional()
  stadiumId?: number;

  @ApiProperty({ type: () => CreateLogoDto })
  @ValidateNested()
  @Type(() => CreateLogoDto)
  logo: CreateLogoDto;
}
