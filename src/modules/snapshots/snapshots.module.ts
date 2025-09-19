import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SnapshotsController } from '@/modules/snapshots/snapshots.controller';
import { SnapshotsRepository } from '@/modules/snapshots/snapshots.repository';
import { SnapshotsService } from '@/modules/snapshots/snapshots.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [SnapshotsController],
  providers: [SnapshotsRepository, SnapshotsService],
  exports: [SnapshotsRepository],
})
export class SnapshotsModule {}
