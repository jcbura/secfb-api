import { PrismaModule } from '@/modules/prisma/prisma.module';
import { StadiumsController } from '@/modules/stadiums/stadiums.controller';
import { StadiumsService } from '@/modules/stadiums/stadiums.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [StadiumsController],
  providers: [StadiumsService],
})
export class StadiumsModule {}
