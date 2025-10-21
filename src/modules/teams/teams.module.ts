import { PrismaModule } from '@/modules/prisma/prisma.module';
import { TeamsController } from '@/modules/teams/teams.controller';
import { TeamsService } from '@/modules/teams/teams.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [TeamsController],
  providers: [TeamsService],
})
export class TeamsModule {}
