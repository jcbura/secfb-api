import {
  BaseRepository,
  PrismaClientOrTransaction,
} from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Logo, Prisma } from '@prisma/client';

@Injectable()
export class LogosRepository extends BaseRepository<
  Logo,
  Prisma.LogoCreateInput,
  Prisma.LogoUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'Logo');
  }

  async findByTeam(
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<Logo | null> {
    const prismaClient = client || this.prismaService;

    try {
      const logo = await prismaClient.logo.findUnique({ where: { teamId } });

      return logo;
    } catch (error) {
      this.logger.error(
        `Database error fetching logo by team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByTeamOrThrow(
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<Logo> {
    const logo = await this.findByTeam(teamId, client);
    if (!logo) {
      this.logger.warn(`Lookup failed: logo with team ID ${teamId} not found`);
      throw new NotFoundException(`Logo with team ID ${teamId} not found`);
    }
    return logo;
  }
}
