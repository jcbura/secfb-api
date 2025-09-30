import { GamesController } from '@/modules/games/games.controller';
import { GamesService } from '@/modules/games/games.service';
import {
  GamesRepository,
  ParticipantsRepository,
} from '@/modules/games/repositories';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { TeamsModule } from '@/modules/teams/teams.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, TeamsModule],
  controllers: [GamesController],
  providers: [GamesService, GamesRepository, ParticipantsRepository],
  exports: [GamesRepository, ParticipantsRepository],
})
export class GamesModule {}
