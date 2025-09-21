import {
  CoreRepository,
  PrismaClientOrTransaction,
} from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findCurrent(
    client?: PrismaClientOrTransaction,
  ): Promise<Season | null> {
    const prismaClient = client || this.prismaService;

    try {
      const season = await prismaClient.season.findFirst({
        where: { isCurrentSeason: true },
      });

      return season;
    } catch (error) {
      this.logger.error('Database error fetching current season', error.stack);
      throw error;
    }
  }

  async findCurrentOrThrow(
    client?: PrismaClientOrTransaction,
  ): Promise<Season> {
    const season = await this.findCurrent(client);
    if (!season) {
      this.logger.warn('Lookup failed: no current season found');
      throw new NotFoundException(`No current season found`);
    }
    return season;
  }
}
