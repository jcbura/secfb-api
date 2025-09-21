import { PrismaModule } from '@/modules/prisma/prisma.module';
import {
  LogosRepository,
  SnapshotsRepository,
  TeamsRepository,
} from '@/modules/teams/repositories';
import { TeamsController } from '@/modules/teams/teams.controller';
import { TeamsService } from '@/modules/teams/teams.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [TeamsController],
  providers: [
    LogosRepository,
    SnapshotsRepository,
    TeamsRepository,
    TeamsService,
  ],
  exports: [LogosRepository, SnapshotsRepository, TeamsRepository],
})
export class TeamsModule {}
