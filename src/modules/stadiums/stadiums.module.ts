import { PrismaModule } from '@/modules/prisma/prisma.module';
import { StadiumsRepository } from '@/modules/stadiums/repositories';
import { StadiumsController } from '@/modules/stadiums/stadiums.controller';
import { StadiumsService } from '@/modules/stadiums/stadiums.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [StadiumsController],
  providers: [StadiumsService, StadiumsRepository],
  exports: [StadiumsRepository],
})
export class StadiumsModule {}
