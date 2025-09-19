import { CoreRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Season } from '@prisma/client';

@Injectable()
export class SeasonsRepository extends CoreRepository<
  Season,
  Prisma.SeasonCreateInput,
  Prisma.SeasonUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'Season');
  }

  findCurrent() {} // findCurrent()
}
