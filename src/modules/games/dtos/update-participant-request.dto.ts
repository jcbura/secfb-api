import { CreateParticipantRequestDto } from '@/modules/games/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateParticipantRequestDto extends PartialType(
  CreateParticipantRequestDto,
) {}
