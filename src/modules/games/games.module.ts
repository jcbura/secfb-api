import { GamesController } from '@/modules/games/games.controller';
import { GamesRepository } from '@/modules/games/games.repository';
import { GamesService } from '@/modules/games/games.service';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [GamesController],
  providers: [GamesRepository, GamesService],
})
export class GamesModule {}
