import { CoreRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamsRepository extends CoreRepository<
  Team,
  Prisma.TeamCreateInput,
  Prisma.TeamUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'Team');
  }
}
