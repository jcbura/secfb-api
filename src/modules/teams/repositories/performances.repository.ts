import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, TeamSeasonPerformance } from '@prisma/client';

@Injectable()
export class PerformancesRepository extends BaseRepository<
  TeamSeasonPerformance,
  Prisma.TeamSeasonPerformanceFindFirstArgs,
  Prisma.TeamSeasonPerformanceFindFirstOrThrowArgs,
  Prisma.TeamSeasonPerformanceFindUniqueArgs,
  Prisma.TeamSeasonPerformanceFindUniqueOrThrowArgs,
  Prisma.TeamSeasonPerformanceCreateArgs,
  Prisma.TeamSeasonPerformanceUpdateArgs,
  Prisma.TeamSeasonPerformanceUpsertArgs,
  Prisma.TeamSeasonPerformanceDeleteArgs,
  Prisma.TeamSeasonPerformanceFindManyArgs,
  Prisma.TeamSeasonPerformanceCreateManyArgs,
  Prisma.TeamSeasonPerformanceUpdateManyArgs,
  Prisma.TeamSeasonPerformanceDeleteManyArgs,
  Prisma.TeamSeasonPerformanceCountArgs,
  Prisma.TeamSeasonPerformanceAggregateArgs,
  Prisma.TeamSeasonPerformanceGroupByArgs
> {
  constructor(
    txHost: TransactionHost<TransactionalAdapterPrisma<PrismaService>>,
  ) {
    super(txHost, 'TeamSeasonPerformance');
  }
}
