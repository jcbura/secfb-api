import { SnapshotsRepository } from '@/modules/snapshots/snapshots.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SnapshotsService {
  constructor(private readonly snapshotsRepository: SnapshotsRepository) {}
}
