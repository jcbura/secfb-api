import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SeasonsRepository } from '@/modules/seasons/repositories';
import { SeasonsController } from '@/modules/seasons/seasons.controller';
import { SeasonsService } from '@/modules/seasons/seasons.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [SeasonsController],
  providers: [SeasonsRepository, SeasonsService],
  exports: [SeasonsRepository],
})
export class SeasonsModule {}
