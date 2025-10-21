import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SeasonsController } from '@/modules/seasons/seasons.controller';
import { SeasonsService } from '@/modules/seasons/seasons.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [SeasonsController],
  providers: [SeasonsService],
  exports: [SeasonsService],
})
export class SeasonsModule {}
