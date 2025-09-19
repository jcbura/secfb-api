import { ParticipantsController } from '@/modules/participants/participants.controller';
import { ParticipantsRepository } from '@/modules/participants/participants.repository';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { ParticipantsService } from './participants.service';

@Module({
  imports: [PrismaModule],
  controllers: [ParticipantsController],
  providers: [ParticipantsRepository, ParticipantsService],
  exports: [ParticipantsRepository],
})
export class ParticipantsModule {}
