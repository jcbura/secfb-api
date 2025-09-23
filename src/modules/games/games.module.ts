import { GamesController } from '@/modules/games/games.controller';
import { GamesService } from '@/modules/games/games.service';
import {
  GamesRepository,
  ParticipantsRepository,
} from '@/modules/games/repositories';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SeasonsModule } from '@/modules/seasons/seasons.module';
import { StadiumsModule } from '@/modules/stadiums/stadiums.module';
import { TeamsModule } from '@/modules/teams/teams.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, SeasonsModule, StadiumsModule, TeamsModule],
  controllers: [GamesController],
  providers: [GamesRepository, ParticipantsRepository, GamesService],
  exports: [GamesRepository, ParticipantsRepository],
})
export class GamesModule {}
