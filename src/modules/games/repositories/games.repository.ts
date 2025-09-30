import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';

@Injectable()
export class GamesRepository extends BaseRepository<
  Game,
  Prisma.GameFindFirstArgs,
  Prisma.GameFindFirstOrThrowArgs,
  Prisma.GameFindUniqueArgs,
  Prisma.GameFindUniqueOrThrowArgs,
  Prisma.GameCreateArgs,
  Prisma.GameUpdateArgs,
  Prisma.GameUpsertArgs,
  Prisma.GameDeleteArgs,
  Prisma.GameFindManyArgs,
  Prisma.GameCreateManyArgs,
  Prisma.GameUpdateManyArgs,
  Prisma.GameDeleteManyArgs,
  Prisma.GameCountArgs,
  Prisma.GameAggregateArgs,
  Prisma.GameGroupByArgs
> {
  constructor(
    txHost: TransactionHost<TransactionalAdapterPrisma<PrismaService>>,
  ) {
    super(txHost, 'Game');
  }

  async findWithParticipants(where: Prisma.GameWhereUniqueInput): Promise<
    Prisma.GameGetPayload<{
      select: {
        id: true;
        date: true;
        isConferenceGame: true;
        isNeutralSite: true;
        seasonId: true;
        gameParticipants: { select: { teamId: true; isHomeTeam: true } };
      };
    }>
  > {
    return this.txHost.tx.game.findUniqueOrThrow({
      where,
      select: {
        id: true,
        date: true,
        isConferenceGame: true,
        isNeutralSite: true,
        seasonId: true,
        gameParticipants: { select: { teamId: true, isHomeTeam: true } },
      },
    });
  }
}
