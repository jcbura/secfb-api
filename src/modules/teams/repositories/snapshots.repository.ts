import {
  BaseRepository,
  PrismaClientOrTransaction,
} from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findByTeam(
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<TeamSeasonSnapshot[]> {
    const prismaClient = client || this.prismaService;

    try {
      const snapshots = await prismaClient.teamSeasonSnapshot.findMany({
        where: { teamId },
      });

      return snapshots;
    } catch (error) {
      this.logger.error(
        `Database error fetching team season snapshots by team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByTeamOrThrow(
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<TeamSeasonSnapshot[]> {
    const snapshots = await this.findByTeam(teamId, client);
    if (snapshots.length === 0) {
      this.logger.warn(
        `Lookup failed: team season snapshots with team ID ${teamId} not found`,
      );
      throw new NotFoundException(
        `Team season snapshots with team ID ${teamId} not found`,
      );
    }
    return snapshots;
  }

  async findByTeamAndSeason(
    seasonId: number,
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<TeamSeasonSnapshot | null> {
    const prismaClient = client || this.prismaService;

    try {
      const snapshot = await prismaClient.teamSeasonSnapshot.findFirst({
        where: { seasonId, teamId },
      });

      return snapshot;
    } catch (error) {
      this.logger.error(
        `Database error fetching team season snapshot by season ID ${seasonId} and team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByTeamAndSeasonOrThrow(
    seasonId: number,
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<TeamSeasonSnapshot> {
    const snapshot = await this.findByTeamAndSeason(seasonId, teamId, client);
    if (!snapshot) {
      this.logger.warn(
        `Lookup failed: team season snapshot with season ID ${seasonId} and team ID ${teamId} not found `,
      );
      throw new NotFoundException(
        `Team season snapshot with season ID ${seasonId} and team ID ${teamId} not found`,
      );
    }
    return snapshot;
  }

  async findByTeamAndCurrentSeason(
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<TeamSeasonSnapshot | null> {
    const prismaClient = client || this.prismaService;

    try {
      const snapshot = await prismaClient.teamSeasonSnapshot.findFirst({
        where: { season: { isCurrentSeason: true }, teamId },
      });

      return snapshot;
    } catch (error) {
      this.logger.error(
        `Database error fetching team season snapshot by current season and team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByTeamAndCurrentSeasonOrThrow(
    teamId: number,
    client?: PrismaClientOrTransaction,
  ): Promise<TeamSeasonSnapshot> {
    const snapshot = await this.findByTeamAndCurrentSeason(teamId, client);
    if (!snapshot) {
      this.logger.warn(
        `Lookup failed: team season snapshot for current season with team ID ${teamId} not found`,
      );
      throw new NotFoundException(
        `Team season snapshot for current season with team ID ${teamId} not found`,
      );
    }
    return snapshot;
  }
}
