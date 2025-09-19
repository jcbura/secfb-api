import { CreateParticipantRequestDto } from '@/modules/participants/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateParticipantRequestDto extends PartialType(
  CreateParticipantRequestDto,
) {}
