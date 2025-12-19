import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  adaptConferenceRankingsToDto,
  adaptRankingsToDto,
  Ranking,
  RANKING_SELECT,
} from '@/modules/rankings/adapters';
import {
  ConferenceRankingResponseDto,
  RankingResponseDto,
  UpdateConferenceRankingsDto,
  UpdateRankingsDto,
} from '@/modules/rankings/dtos';
import { SeasonsService } from '@/modules/seasons/seasons.service';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RankingsService {
  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
    private readonly seasonsService: SeasonsService,
  ) {}

  async findConferenceRankings(): Promise<ConferenceRankingResponseDto[]> {
    const currentSeasonId = await this.getCurrentSeasonId();

    const rankings: Ranking[] = await this.txHost.tx.teamSeasonStat.findMany({
      where: { seasonId: currentSeasonId, conferenceRank: { not: null } },
      select: RANKING_SELECT,
      orderBy: { conferenceRank: 'asc' },
    });

    return adaptConferenceRankingsToDto(rankings);
  }

  async findApRankings(): Promise<RankingResponseDto[]> {
    const currentSeasonId = await this.getCurrentSeasonId();

    const rankings: Ranking[] = await this.txHost.tx.teamSeasonStat.findMany({
      where: { seasonId: currentSeasonId, apRank: { not: null } },
      select: RANKING_SELECT,
      orderBy: { apRank: 'asc' },
    });

    return adaptRankingsToDto(rankings, 'apRank');
  }

  async findCfpRankings(): Promise<RankingResponseDto[]> {
    const currentSeasonId = await this.getCurrentSeasonId();

    const rankings: Ranking[] = await this.txHost.tx.teamSeasonStat.findMany({
      where: { seasonId: currentSeasonId, cfpRank: { not: null } },
      select: RANKING_SELECT,
      orderBy: { cfpRank: 'asc' },
    });

    return adaptRankingsToDto(rankings, 'cfpRank');
  }

  @Transactional()
  async updateConferenceRankings(
    dto: UpdateConferenceRankingsDto,
  ): Promise<ConferenceRankingResponseDto[]> {
    const currentSeasonId = await this.getCurrentSeasonId();

    await this.clearRankings(currentSeasonId, 'conferenceRank');
    await this.applyRankings(currentSeasonId, dto.rankings, 'conferenceRank');

    return this.findConferenceRankings();
  }

  @Transactional()
  async updateApRankings(
    dto: UpdateRankingsDto,
  ): Promise<RankingResponseDto[]> {
    const currentSeasonId = await this.getCurrentSeasonId();

    await this.clearRankings(currentSeasonId, 'apRank');
    await this.applyRankings(currentSeasonId, dto.rankings, 'apRank');

    return this.findApRankings();
  }

  @Transactional()
  async updateCfpRankings(
    dto: UpdateRankingsDto,
  ): Promise<RankingResponseDto[]> {
    const currentSeasonId = await this.getCurrentSeasonId();

    await this.clearRankings(currentSeasonId, 'cfpRank');
    await this.applyRankings(currentSeasonId, dto.rankings, 'cfpRank');

    await this.txHost.tx.season.update({
      where: { id: currentSeasonId },
      data: { isCfpRankAvailable: true },
    });

    return this.findCfpRankings();
  }

  private async clearRankings(
    seasonId: number,
    rankingType: 'conferenceRank' | 'apRank' | 'cfpRank',
  ): Promise<void> {
    await this.txHost.tx.teamSeasonStat.updateMany({
      where: { seasonId, [rankingType]: { not: null } },
      data: { [rankingType]: null },
    });
  }

  private async applyRankings(
    seasonId: number,
    rankings: Array<{ rank: number; teamId: number }>,
    rankingType: 'conferenceRank' | 'apRank' | 'cfpRank',
  ): Promise<void> {
    for (const { rank, teamId } of rankings) {
      await this.txHost.tx.teamSeasonStat.upsert({
        where: {
          teamId_seasonId: { teamId, seasonId },
        },
        update: {
          [rankingType]: rank,
        },
        create: {
          teamId,
          seasonId,
          [rankingType]: rank,
        },
      });
    }
  }

  private async getCurrentSeasonId(): Promise<number> {
    const season = await this.seasonsService.findCurrent();
    return season.id;
  }
}
