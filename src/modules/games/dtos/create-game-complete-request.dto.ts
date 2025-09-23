import {
  CreateGameRequestDto,
  ParticipantsRequestDto,
} from '@/modules/games/dtos';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class CreateGameCompleteRequestDto {
  @ApiProperty({ type: () => CreateGameRequestDto })
  @ValidateNested()
  @Type(() => CreateGameRequestDto)
  game: CreateGameRequestDto;

  @ApiProperty({
    type: () => ParticipantsRequestDto,
  })
  @ValidateNested()
  @Type(() => ParticipantsRequestDto)
  participants: ParticipantsRequestDto;
}
