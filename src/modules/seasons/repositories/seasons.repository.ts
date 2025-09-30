import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Season } from '@prisma/client';

@Injectable()
export class SeasonsRepository extends BaseRepository<
  Season,
  Prisma.SeasonFindFirstArgs,
  Prisma.SeasonFindFirstOrThrowArgs,
  Prisma.SeasonFindUniqueArgs,
  Prisma.SeasonFindUniqueOrThrowArgs,
  Prisma.SeasonCreateArgs,
  Prisma.SeasonUpdateArgs,
  Prisma.SeasonUpsertArgs,
  Prisma.SeasonDeleteArgs,
  Prisma.SeasonFindManyArgs,
  Prisma.SeasonCreateManyArgs,
  Prisma.SeasonUpdateManyArgs,
  Prisma.SeasonDeleteManyArgs,
  Prisma.SeasonCountArgs,
  Prisma.SeasonAggregateArgs,
  Prisma.SeasonGroupByArgs
> {
  constructor(
    txHost: TransactionHost<TransactionalAdapterPrisma<PrismaService>>,
  ) {
    super(txHost, 'Season');
  }
}
