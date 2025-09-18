import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class LogosRepository {
  private readonly logger = new Logger(LogosRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ==========================================
  // CORE CRUD OPERATIONS
  // ==========================================

  create() {} // create(teamId, data)

  findByTeam() {} // findByTeam(teamId) - validation for updating

  findByTeamOrThrow() {} // findByTeamOrThrow(teamId) - validation for updating

  update() {} // update(teamId, data)

  softDelete() {} // softDelete(teamId)

  restore() {} // restore(teamId)

  hardDelete() {} // harDelete(teamId)
}
