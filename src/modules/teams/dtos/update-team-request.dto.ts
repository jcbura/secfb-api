import { CreateTeamRequestDto } from '@/modules/teams/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateTeamRequestDto extends PartialType(CreateTeamRequestDto) {}
