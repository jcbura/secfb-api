import { CoreRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';

@Injectable()
export class GamesRepository extends CoreRepository<
  Game,
  Prisma.GameCreateInput,
  Prisma.GameUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'Game');
  }
}
