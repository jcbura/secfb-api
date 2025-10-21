import { CreateLogoDto } from '@/modules/teams/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Conference } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
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

  @ApiProperty({ type: String, example: 'ala' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Abbreviation must contain only letters',
  })
  @Transform(({ value }) => value.toLowerCase())
  abbreviation: string;

  @ApiProperty({ type: String, example: 'Crimson Tide' })
  @IsString()
  @IsNotEmpty()
  mascot: string;

  @ApiProperty({ enum: Conference, example: Conference.SEC })
  @IsEnum(Conference)
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

export class BulkCreateTeamDto {
  @ApiProperty({ type: [CreateTeamDto], minItems: 1 })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTeamDto)
  @ArrayMinSize(1)
  teams: CreateTeamDto[];
}
