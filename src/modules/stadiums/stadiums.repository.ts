import { CoreRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Stadium } from '@prisma/client';

@Injectable()
export class StadiumsRepository extends CoreRepository<
  Stadium,
  Prisma.StadiumCreateInput,
  Prisma.StadiumUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'Stadium');
  }

  findByLocation() {} // findByLocation(city, state)
}
