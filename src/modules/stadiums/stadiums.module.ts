import { PrismaModule } from '@/modules/prisma/prisma.module';
import { StadiumsController } from '@/modules/stadiums/stadiums.controller';
import { StadiumsRepository } from '@/modules/stadiums/stadiums.repository';
import { StadiumsService } from '@/modules/stadiums/stadiums.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [StadiumsController],
  providers: [StadiumsRepository, StadiumsService],
})
export class StadiumsModule {}
