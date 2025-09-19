import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Logo, Prisma } from '@prisma/client';

@Injectable()
export class ParticipantsRepository extends BaseRepository<
  Logo,
  Prisma.GameParticipantCreateInput,
  Prisma.GameParticipantUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'GameParticipant');
  }
}
