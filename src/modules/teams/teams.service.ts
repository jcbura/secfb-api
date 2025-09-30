import { isNumericId, parseIdentifier } from '@/common/utils';
import { SeasonsRepository } from '@/modules/seasons/repositories';
import {
  CreatePerformanceDto,
  CreateTeamDto,
  UpdateLogoDto,
  UpdatePerformanceDto,
  UpdateTeamDto,
} from '@/modules/teams/dtos';
import {
  LogosRepository,
  PerformancesRepository,
  TeamsRepository,
} from '@/modules/teams/repositories';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(
    private readonly logosRepository: LogosRepository,
    private readonly performancesRepository: PerformancesRepository,
    private readonly seasonsRepository: SeasonsRepository,
    private readonly teamsRepository: TeamsRepository,
  ) {}

  async create(dto: CreateTeamDto) {
    return this.teamsRepository.create({
      data: {
        ...dto,
        slug: this.generateSlug(dto.displayName),
        ...(dto.logo && { logo: { create: { ...dto.logo } } }),
      },
    });
  }

  async findMany() {
    return this.teamsRepository.findMany({});
  }

  async find(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.teamsRepository.findUniqueOrThrow({ where });
  }

  async update(identifier: string, dto: UpdateTeamDto) {
    const where = parseIdentifier(identifier);
    const data: Prisma.TeamUpdateInput = { ...dto };

    if (dto.displayName) data.slug = this.generateSlug(dto.displayName);

    return this.teamsRepository.update({ where, data });
  }

  async delete(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.teamsRepository.delete({ where });
  }

  async updateLogo(identifier: string, dto: UpdateLogoDto) {
    let teamId: number;

    if (isNumericId(identifier)) {
      teamId = parseInt(identifier, 10);
    } else {
      const where = parseIdentifier(identifier);
      const team = await this.teamsRepository.findUniqueOrThrow({
        where,
        select: { id: true },
      });
      teamId = team.id;
    }

    return this.logosRepository.update({ where: { teamId }, data: { ...dto } });
  }

  async deleteLogo(identifier: string) {
    let teamId: number;

    if (isNumericId(identifier)) {
      teamId = parseInt(identifier, 10);
    } else {
      const where = parseIdentifier(identifier);
      const team = await this.teamsRepository.findUniqueOrThrow({
        where,
        select: { id: true },
      });
      teamId = team.id;
    }

    return this.logosRepository.delete({ where: { teamId } });
  }

  async createPerformance(
    identifier: string,
    seasonIdentifier: string,
    dto: CreatePerformanceDto,
  ) {
    let teamId: number;
    let seasonId: number;

    if (isNumericId(identifier) && isNumericId(seasonIdentifier)) {
      teamId = parseInt(identifier, 10);
      seasonId = parseInt(seasonIdentifier, 10);
    } else {
      const teamWhere = parseIdentifier(identifier);
      const seasonWhere = parseIdentifier(seasonIdentifier);

      const [team, season] = await Promise.all([
        this.teamsRepository.findUniqueOrThrow({
          where: teamWhere,
          select: { id: true },
        }),
        this.seasonsRepository.findUniqueOrThrow({
          where: seasonWhere,
          select: { id: true },
        }),
      ]);

      teamId = team.id;
      seasonId = season.id;
    }

    return this.performancesRepository.create({
      data: { ...dto, teamId, seasonId },
    });
  }

  async findPerformance(identifier: string, seasonIdentifier: string) {
    let teamId: number;
    let seasonId: number;

    if (isNumericId(identifier) && isNumericId(seasonIdentifier)) {
      teamId = parseInt(identifier, 10);
      seasonId = parseInt(seasonIdentifier, 10);
    } else {
      const teamWhere = parseIdentifier(identifier);
      const seasonWhere = parseIdentifier(seasonIdentifier);

      const [team, season] = await Promise.all([
        this.teamsRepository.findUniqueOrThrow({
          where: teamWhere,
          select: { id: true },
        }),
        this.seasonsRepository.findUniqueOrThrow({
          where: seasonWhere,
          select: { id: true },
        }),
      ]);

      teamId = team.id;
      seasonId = season.id;
    }

    return this.performancesRepository.findUnique({
      where: { teamId_seasonId: { teamId, seasonId } },
    });
  }

  async updatePerformance(
    identifier: string,
    seasonIdentifier: string,
    dto: UpdatePerformanceDto,
  ) {
    let teamId: number;
    let seasonId: number;

    if (isNumericId(identifier) && isNumericId(seasonIdentifier)) {
      teamId = parseInt(identifier, 10);
      seasonId = parseInt(seasonIdentifier, 10);
    } else {
      const teamWhere = parseIdentifier(identifier);
      const seasonWhere = parseIdentifier(seasonIdentifier);

      const [team, season] = await Promise.all([
        this.teamsRepository.findUniqueOrThrow({
          where: teamWhere,
          select: { id: true },
        }),
        this.seasonsRepository.findUniqueOrThrow({
          where: seasonWhere,
          select: { id: true },
        }),
      ]);

      teamId = team.id;
      seasonId = season.id;
    }

    return this.performancesRepository.update({
      where: { teamId_seasonId: { teamId, seasonId } },
      data: { ...dto },
    });
  }

  async deletePerformance(identifier: string, seasonIdentifier: string) {
    let teamId: number;
    let seasonId: number;

    if (isNumericId(identifier) && isNumericId(seasonIdentifier)) {
      teamId = parseInt(identifier, 10);
      seasonId = parseInt(seasonIdentifier, 10);
    } else {
      const teamWhere = parseIdentifier(identifier);
      const seasonWhere = parseIdentifier(seasonIdentifier);

      const [team, season] = await Promise.all([
        this.teamsRepository.findUniqueOrThrow({
          where: teamWhere,
          select: { id: true },
        }),
        this.seasonsRepository.findUniqueOrThrow({
          where: seasonWhere,
          select: { id: true },
        }),
      ]);

      teamId = team.id;
      seasonId = season.id;
    }

    return this.performancesRepository.delete({
      where: { teamId_seasonId: { teamId, seasonId } },
    });
  }

  private generateSlug(displayName: string): string {
    return displayName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
