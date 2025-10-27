import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsNumber,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

class RankingDto {
  @ApiProperty({ type: Number, minimum: 1, maximum: 25 })
  @IsNumber()
  @Min(1)
  @Max(25)
  rank: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  teamId: number;
}

class ConferenceRankingDto {
  @ApiProperty({ type: Number, minimum: 1, maximum: 16 })
  @IsNumber()
  @Min(1)
  @Max(16)
  rank: number;

  @ApiProperty({ type: Number, minimum: 1 })
  @IsNumber()
  @Min(1)
  teamId: number;
}

export class UpdateRankingsDto {
  @ApiProperty({
    type: [RankingDto],
    minItems: 1,
    maxItems: 25,
    example: [
      { rank: 1, teamId: 1 },
      { rank: 2, teamId: 1 },
      { rank: 3, teamId: 1 },
      { rank: 4, teamId: 1 },
      { rank: 5, teamId: 1 },
      { rank: 6, teamId: 1 },
      { rank: 7, teamId: 1 },
      { rank: 8, teamId: 1 },
      { rank: 9, teamId: 1 },
      { rank: 10, teamId: 1 },
      { rank: 11, teamId: 1 },
      { rank: 12, teamId: 1 },
      { rank: 13, teamId: 1 },
      { rank: 14, teamId: 1 },
      { rank: 15, teamId: 1 },
      { rank: 16, teamId: 1 },
      { rank: 17, teamId: 1 },
      { rank: 18, teamId: 1 },
      { rank: 19, teamId: 1 },
      { rank: 20, teamId: 1 },
      { rank: 21, teamId: 1 },
      { rank: 22, teamId: 1 },
      { rank: 23, teamId: 1 },
      { rank: 24, teamId: 1 },
      { rank: 25, teamId: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RankingDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(25)
  rankings: RankingDto[];
}

export class UpdateConferenceRankingsDto {
  @ApiProperty({
    type: [ConferenceRankingDto],
    minItems: 1,
    maxItems: 16,
    example: [
      { rank: 1, teamId: 1 },
      { rank: 2, teamId: 1 },
      { rank: 3, teamId: 1 },
      { rank: 4, teamId: 1 },
      { rank: 5, teamId: 1 },
      { rank: 6, teamId: 1 },
      { rank: 7, teamId: 1 },
      { rank: 8, teamId: 1 },
      { rank: 9, teamId: 1 },
      { rank: 10, teamId: 1 },
      { rank: 11, teamId: 1 },
      { rank: 12, teamId: 1 },
      { rank: 13, teamId: 1 },
      { rank: 14, teamId: 1 },
      { rank: 15, teamId: 1 },
      { rank: 16, teamId: 1 },
    ],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConferenceRankingDto)
  @ArrayMinSize(1)
  @ArrayMaxSize(16)
  rankings: ConferenceRankingDto[];
}
