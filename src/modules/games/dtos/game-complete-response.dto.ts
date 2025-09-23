import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import { GameResponseDto, ParticipantResponseDto } from '@/modules/games/dtos';
import { ApiProperty } from '@nestjs/swagger';

export class GameCompleteResponseDto {
  @ApiProperty({ type: () => GameResponseDto })
  game: GameResponseDto;

  @ApiProperty({
    type: () => [ParticipantResponseDto],
    minItems: 2,
    maxItems: 2,
  })
  participants: ParticipantResponseDto[];
}

export class BaseGameCompleteResponseDto extends withBaseResponse(
  GameCompleteResponseDto,
) {}
export class BaseArrayGameCompleteResponseDto extends withBaseArrayResponse(
  GameCompleteResponseDto,
) {}
