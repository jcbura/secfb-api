import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { GameParticipant, Prisma } from '@prisma/client';

@Injectable()
export class ParticipantsRepository extends BaseRepository<
  GameParticipant,
  Prisma.GameParticipantFindFirstArgs,
  Prisma.GameParticipantFindFirstOrThrowArgs,
  Prisma.GameParticipantFindUniqueArgs,
  Prisma.GameParticipantFindUniqueOrThrowArgs,
  Prisma.GameParticipantCreateArgs,
  Prisma.GameParticipantUpdateArgs,
  Prisma.GameParticipantUpsertArgs,
  Prisma.GameParticipantDeleteArgs,
  Prisma.GameParticipantFindManyArgs,
  Prisma.GameParticipantCreateManyArgs,
  Prisma.GameParticipantUpdateManyArgs,
  Prisma.GameParticipantDeleteManyArgs,
  Prisma.GameParticipantCountArgs,
  Prisma.GameParticipantAggregateArgs,
  Prisma.GameParticipantGroupByArgs
> {
  constructor(
    txHost: TransactionHost<TransactionalAdapterPrisma<PrismaService>>,
  ) {
    super(txHost, 'GameParticipant');
  }
}
