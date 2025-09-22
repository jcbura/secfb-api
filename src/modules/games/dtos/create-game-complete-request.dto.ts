import {
  CreateGameRequestDto,
  CreateParticipantRequestDto,
} from '@/modules/games/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayMaxSize, ArrayMinSize, ValidateNested } from 'class-validator';

export class CreateGameCompleteRequestDto {
  @ApiProperty({ type: () => CreateGameRequestDto })
  @ValidateNested()
  @Type(() => CreateGameRequestDto)
  game: CreateGameRequestDto;

  @ApiProperty({
    type: () => [CreateParticipantRequestDto],
    minItems: 2,
    maxItems: 2,
    example: [
      {
        isHomeTeam: false,
        score: 0,
        gameId: 1,
        teamId: 1,
      },
      {
        isHomeTeam: true,
        score: 0,
        gameId: 1,
        teamId: 2,
      },
    ],
  })
  @ValidateNested({ each: true })
  @Type(() => CreateParticipantRequestDto)
  @ArrayMinSize(2)
  @ArrayMaxSize(2)
  participants: CreateParticipantRequestDto[];
}
