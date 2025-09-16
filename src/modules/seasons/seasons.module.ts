import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SeasonsController } from '@/modules/seasons/seasons.controller';
import { SeasonsRepository } from '@/modules/seasons/seasons.repository';
import { SeasonsService } from '@/modules/seasons/seasons.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [SeasonsController],
  providers: [SeasonsRepository, SeasonsService],
})
export class SeasonsModule {}
