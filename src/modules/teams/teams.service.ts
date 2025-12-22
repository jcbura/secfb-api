import { isNumericId, parseIdentifier } from '@/common/utils';
import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  adaptLogoToDto,
  adaptTeamsToDto,
  adaptTeamToDto,
  TEAM_INCLUDE,
  TeamWithRelation,
} from '@/modules/teams/adapaters';
import {
  BulkCreateTeamDto,
  CreateTeamDto,
  LogoResponseDto,
  QueryTeamDto,
  TeamResponseDto,
  UpdateLogoDto,
  UpdateTeamDto,
} from '@/modules/teams/dtos';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Logo, Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamsService {
  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async create(dto: CreateTeamDto): Promise<TeamResponseDto> {
    const { logo, ...teamData } = dto;
    const displayName = `${teamData.shortDisplayName} ${teamData.mascot}`;

    const data: Prisma.TeamCreateInput = {
      ...teamData,
      displayName,
      slug: this.generateSlug(displayName),
      logo: { create: { ...logo, alt: `${displayName} Logo` } },
    };

    const team: TeamWithRelation = await this.txHost.tx.team.create({
      data,
      include: TEAM_INCLUDE,
    });

    return adaptTeamToDto(team);
  }

  @Transactional()
  async createMany(dto: BulkCreateTeamDto): Promise<TeamResponseDto[]> {
    const teamsData = dto.teams.map(team => {
      const { logo: _logo, ...teamData } = team;
      const displayName = `${teamData.shortDisplayName} ${teamData.mascot}`;

      return {
        ...teamData,
        displayName,
        slug: this.generateSlug(displayName),
      };
    });

    const teams: Team[] = await this.txHost.tx.team.createManyAndReturn({
      data: teamsData,
    });

    const logosData = dto.teams.map((team, index) => {
      const displayName = `${team.shortDisplayName} ${team.mascot}`;
      return {
        ...team.logo,
        alt: `${displayName} Logo`,
        teamId: teams[index].id,
      };
    });

    await this.txHost.tx.logo.createMany({ data: logosData });

    const teamsWithRelations: TeamWithRelation[] =
      await this.txHost.tx.team.findMany({
        where: { id: { in: teams.map(team => team.id) } },
        include: TEAM_INCLUDE,
      });

    return adaptTeamsToDto(teamsWithRelations);
  }

  async findMany(query: QueryTeamDto): Promise<TeamResponseDto[]> {
    const where = query.toWhereInput();
    const orderBy = query.toOrderByInput();
    const teams: TeamWithRelation[] = await this.txHost.tx.team.findMany({
      where,
      include: TEAM_INCLUDE,
      orderBy,
    });
    return adaptTeamsToDto(teams);
  }

  async find(identifier: string): Promise<TeamResponseDto> {
    const where = parseIdentifier(identifier);
    const team: TeamWithRelation = await this.txHost.tx.team.findUniqueOrThrow({
      where,
      include: TEAM_INCLUDE,
    });
    return adaptTeamToDto(team);
  }

  async update(
    identifier: string,
    dto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    const where = parseIdentifier(identifier);
    const data: Prisma.TeamUpdateInput = { ...dto };

    if (dto.shortDisplayName || dto.mascot) {
      const existingTeam = await this.txHost.tx.team.findUniqueOrThrow({
        where,
        select: { shortDisplayName: true, mascot: true },
      });

      const shortDisplayName =
        dto.shortDisplayName ?? existingTeam.shortDisplayName;
      const mascot = dto.mascot ?? existingTeam.mascot;
      const displayName = `${shortDisplayName} ${mascot}`;

      data.displayName = displayName;
      data.slug = this.generateSlug(displayName);
      data.logo = { update: { alt: `${displayName} Logo` } };
    }

    const team: TeamWithRelation = await this.txHost.tx.team.update({
      where,
      data,
      include: TEAM_INCLUDE,
    });
    return adaptTeamToDto(team);
  }

  async delete(identifier: string): Promise<TeamResponseDto> {
    const where = parseIdentifier(identifier);
    const team: TeamWithRelation = await this.txHost.tx.team.delete({
      where,
      include: TEAM_INCLUDE,
    });
    return adaptTeamToDto(team);
  }

  async updateLogo(
    identifier: string,
    dto: UpdateLogoDto,
  ): Promise<LogoResponseDto> {
    const teamId = await this.resolveTeamId(identifier);

    const logo: Logo = await this.txHost.tx.logo.update({
      where: { teamId },
      data: { ...dto },
    });
    return adaptLogoToDto(logo);
  }

  async deleteLogo(identifier: string): Promise<LogoResponseDto> {
    const teamId = await this.resolveTeamId(identifier);

    const logo: Logo = await this.txHost.tx.logo.delete({
      where: { teamId },
    });
    return adaptLogoToDto(logo);
  }

  private generateSlug(displayName: string): string {
    return displayName
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private async resolveTeamId(identifier: string): Promise<number> {
    if (isNumericId(identifier)) {
      return parseInt(identifier, 10);
    }

    const where = parseIdentifier(identifier);
    const team = await this.txHost.tx.team.findUniqueOrThrow({
      where,
      select: { id: true },
    });
    return team.id;
  }
}
