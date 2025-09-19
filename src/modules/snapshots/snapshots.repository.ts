import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, TeamSeasonSnapshot } from '@prisma/client';

@Injectable()
export class SnapshotsRepository extends BaseRepository<
  TeamSeasonSnapshot,
  Prisma.TeamSeasonSnapshotCreateInput,
  Prisma.TeamSeasonSnapshotUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'TeamSeasonSnapshot');
  }

  findBySeason() {} // findBySeason(seasonId)

  findByTeam() {} // findByTeam(teamId)

  findByCurrentSeason() {} // findByCurrentSeason()

  findByCurrentSeasonAndTeam() {} // findByCurrentSeasonAndTeam(teamId)
}
