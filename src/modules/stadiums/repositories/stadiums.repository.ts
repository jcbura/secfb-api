import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Stadium } from '@prisma/client';

@Injectable()
export class StadiumsRepository extends BaseRepository<
  Stadium,
  Prisma.StadiumFindFirstArgs,
  Prisma.StadiumFindFirstOrThrowArgs,
  Prisma.StadiumFindUniqueArgs,
  Prisma.StadiumFindUniqueOrThrowArgs,
  Prisma.StadiumCreateArgs,
  Prisma.StadiumUpdateArgs,
  Prisma.StadiumUpsertArgs,
  Prisma.StadiumDeleteArgs,
  Prisma.StadiumFindManyArgs,
  Prisma.StadiumCreateManyArgs,
  Prisma.StadiumUpdateManyArgs,
  Prisma.StadiumDeleteManyArgs,
  Prisma.StadiumCountArgs,
  Prisma.StadiumAggregateArgs,
  Prisma.StadiumGroupByArgs
> {
  constructor(
    txHost: TransactionHost<TransactionalAdapterPrisma<PrismaService>>,
  ) {
    super(txHost, 'Stadium');
  }
}
