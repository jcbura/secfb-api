import { CreateTeamDto } from '@/modules/teams/dtos';
import { OmitType, PartialType } from '@nestjs/swagger';

export class UpdateTeamDto extends PartialType(
  OmitType(CreateTeamDto, ['logo'] as const),
) {}
