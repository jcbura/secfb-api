import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SeasonsModule } from '@/modules/seasons/seasons.module';
import {
  LogosRepository,
  PerformancesRepository,
  TeamsRepository,
} from '@/modules/teams/repositories';
import { TeamsController } from '@/modules/teams/teams.controller';
import { TeamsService } from '@/modules/teams/teams.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, SeasonsModule],
  controllers: [TeamsController],
  providers: [
    TeamsService,
    LogosRepository,
    PerformancesRepository,
    TeamsRepository,
  ],
  exports: [LogosRepository, PerformancesRepository, TeamsRepository],
})
export class TeamsModule {}
