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

  findBySeason() {} // findBySeason(seasonId)

  findByCurrentSeason() {} // findByCurrentSeason()

  findByWeek() {} // findByWeek(seasonId, weekNumber)

  findByCurrentSeasonAndWeek() {} // findByCurrentSeasonAndWeek(weekNumber)

  findByDate() {} // findByDate(date)

  findByDateRange() {} // findByDateRange(startDate, endDate)

  findByGameType() {} // findByGameType(gameType)

  findByGameTypeAndSeason() {} // findByGameTypeAndSeason(gameType, seasonId)

  findByGameTypeAndCurrentSeason() {} // findByGameTypeAndCurrentSeason(gameType)
}
