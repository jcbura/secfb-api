import { CreateSnapshotRequestDto } from '@/modules/snapshots/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateSnapshotRequestDto extends PartialType(
  CreateSnapshotRequestDto,
) {}
