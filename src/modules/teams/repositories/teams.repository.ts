import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamsRepository extends BaseRepository<
  Team,
  Prisma.TeamFindFirstArgs,
  Prisma.TeamFindFirstOrThrowArgs,
  Prisma.TeamFindUniqueArgs,
  Prisma.TeamFindUniqueOrThrowArgs,
  Prisma.TeamCreateArgs,
  Prisma.TeamUpdateArgs,
  Prisma.TeamUpsertArgs,
  Prisma.TeamDeleteArgs,
  Prisma.TeamFindManyArgs,
  Prisma.TeamCreateManyArgs,
  Prisma.TeamUpdateManyArgs,
  Prisma.TeamDeleteManyArgs,
  Prisma.TeamCountArgs,
  Prisma.TeamAggregateArgs,
  Prisma.TeamGroupByArgs
> {
  constructor(
    txHost: TransactionHost<TransactionalAdapterPrisma<PrismaService>>,
  ) {
    super(txHost, 'Team');
  }
}
