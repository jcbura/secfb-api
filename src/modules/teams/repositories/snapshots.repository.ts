import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class SnapshotsRepository {
  private readonly logger = new Logger(SnapshotsRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ==========================================
  // CORE CRUD OPERATIONS
  // ==========================================

  create() {} // create(seasonId, teamId, data)

  findBySeasonAndTeam() {} // findBySeasonAndTeam(seasonId, teamId) - validation for updating

  findBySeasonAndTeamOrThrow() {} // findBySeasonAndTeamOrThrow(seasonId, teamId) - validation for updating

  update() {} // update(seasonId, teamId, data)

  softDelete() {} // softDelete(seasonId, teamId)

  restore() {} // restore(seasonId, teamId)

  hardDelete() {} // hardDelete(seasonId, teamId)

  // ==========================================
  // QUERY OPERATIONS
  // ==========================================

  findBySeason() {} // findBySeason(seasonId)

  findByTeam() {} // findByTeam(teamId)

  findByCurrentSeason() {} // findByCurrentSeason()

  findByCurrentSeasonAndTeam() {} // findByCurrentSeasonAndTeam(teamId)
}
