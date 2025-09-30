import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Logo, Prisma } from '@prisma/client';

@Injectable()
export class LogosRepository extends BaseRepository<
  Logo,
  Prisma.LogoFindFirstArgs,
  Prisma.LogoFindFirstOrThrowArgs,
  Prisma.LogoFindUniqueArgs,
  Prisma.LogoFindUniqueOrThrowArgs,
  Prisma.LogoCreateArgs,
  Prisma.LogoUpdateArgs,
  Prisma.LogoUpsertArgs,
  Prisma.LogoDeleteArgs,
  Prisma.LogoFindManyArgs,
  Prisma.LogoCreateManyArgs,
  Prisma.LogoUpdateManyArgs,
  Prisma.LogoDeleteManyArgs,
  Prisma.LogoCountArgs,
  Prisma.LogoAggregateArgs,
  Prisma.LogoGroupByArgs
> {
  constructor(
    txHost: TransactionHost<TransactionalAdapterPrisma<PrismaService>>,
  ) {
    super(txHost, 'Logo');
  }
}
