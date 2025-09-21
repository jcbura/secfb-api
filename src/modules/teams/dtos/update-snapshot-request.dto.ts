import { CreateSnapshotRequestDto } from '@/modules/teams/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateSnapshotRequestDto extends PartialType(
  CreateSnapshotRequestDto,
) {}
