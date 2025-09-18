import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ParticipantsRepository {
  private readonly logger = new Logger(ParticipantsRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ==========================================
  // CORE CRUD OPERATIONS
  // ==========================================

  create() {} // create(gameId, awayTeamId, homeTeamId)

  findByGameAndTeam() {} // findByGameAndTeam(gameId, teamId) - validation for updating

  findByGameAndTeamOrThrow() {} // findByGameAndTeamOrThrow(gameId, teamId) - validation for updating

  update() {} // update(gameId, teamId, data)

  updateScore() {} // updateScore(gameId, awayScore, homeScore)

  softDelete() {} // softDelete(gameId, teamId)

  restore() {} // restore(gameId, teamId)

  hardDelete() {} // hardDelete(gameId, teamId)
}
