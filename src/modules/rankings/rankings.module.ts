import { PrismaModule } from '@/modules/prisma/prisma.module';
import { RankingsController } from '@/modules/rankings/rankings.controller';
import { RankingsService } from '@/modules/rankings/rankings.service';
import { SeasonsModule } from '@/modules/seasons/seasons.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule, SeasonsModule],
  controllers: [RankingsController],
  providers: [RankingsService],
})
export class RankingsModule {}
