import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamsRepository {
  private readonly logger = new Logger(TeamsRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ==========================================
  // CORE CRUD OPERATIONS
  // ==========================================

  async create(data: Prisma.TeamCreateInput): Promise<Team> {
    try {
      const team = await this.prismaService.team.create({ data });

      this.logger.log(`Team created: ${team.id}`);
      return team;
    } catch (error) {
      this.logger.error('Database error creating team', error.stack);
      throw error;
    }
  }

  async findAll(): Promise<Team[]> {
    try {
      const teams = await this.prismaService.team.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'asc' },
      });

      return teams;
    } catch (error) {
      this.logger.error('Database error fetching all teams', error.stack);
      throw error;
    }
  }

  async findById(id: number): Promise<Team | null> {
    try {
      const team = await this.prismaService.team.findUnique({
        where: { id, deletedAt: null },
      });

      return team;
    } catch (error) {
      this.logger.error(
        `Database error fetching team by ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByIdOrThrow(id: number): Promise<Team> {
    const team = await this.findById(id);
    if (!team) {
      this.logger.warn(`Team lookup failed: ID ${id} not found`);
      throw new NotFoundException(`Team with ID ${id} not found`);
    }
    return team;
  }

  async findBySlug(slug: string): Promise<Team | null> {
    try {
      const team = await this.prismaService.team.findUnique({
        where: { slug, deletedAt: null },
      });

      return team;
    } catch (error) {
      this.logger.error(
        `Database error fetching team by slug ${slug}`,
        error.stack,
      );
      throw error;
    }
  }

  async findBySlugOrThrow(slug: string): Promise<Team> {
    const team = await this.findBySlug(slug);
    if (!team) {
      this.logger.warn(`Team lookup failed: slug ${slug} not found`);
      throw new NotFoundException(`Team with slug ${slug} not found`);
    }
    return team;
  }

  async findByIdentifier(identifier: string): Promise<Team | null> {
    const numericId = parseInt(identifier, 10);
    if (!isNaN(numericId) && numericId.toString() === identifier) {
      return this.findById(numericId);
    }
    return this.findBySlug(identifier);
  }

  async findByIdentifierOrThrow(identifier: string): Promise<Team> {
    const team = await this.findByIdentifier(identifier);
    if (!team) {
      this.logger.warn(
        `Team lookup failed: identifier ${identifier} not found`,
      );
      throw new NotFoundException(
        `Team with identifier ${identifier} not found`,
      );
    }
    return team;
  }

  async update(id: number, data: Prisma.TeamUpdateInput): Promise<Team> {
    try {
      await this.findByIdOrThrow(id);

      const team = await this.prismaService.team.update({
        where: { id },
        data,
      });

      this.logger.log(`Team updated: ${team.id}`);
      return team;
    } catch (error) {
      this.logger.error(`Database error updating team ${id}`, error.stack);
      throw error;
    }
  }

  async softDelete(id: number): Promise<Team> {
    try {
      await this.findByIdOrThrow(id);

      const team = await this.prismaService.team.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      this.logger.log(`Team soft deleted: ${team.id}`);
      return team;
    } catch (error) {
      this.logger.error(`Database error soft deleting team ${id}`, error.stack);
      throw error;
    }
  }

  async restore(id: number): Promise<Team> {
    try {
      const team = await this.prismaService.team.findUnique({ where: { id } });
      if (!team) {
        this.logger.warn(`Restore failed: team ${id} not found`);
        throw new NotFoundException(`Team with ID ${id} not found`);
      }

      const restoredTeam = await this.prismaService.team.update({
        where: { id },
        data: { deletedAt: null },
      });

      this.logger.log(`Team restored: ${restoredTeam.id}`);
      return restoredTeam;
    } catch (error) {
      this.logger.error(`Database error restoring team ${id}`, error.stack);
      throw error;
    }
  }

  async hardDelete(id: number): Promise<Team> {
    try {
      const team = await this.prismaService.team.findUnique({ where: { id } });
      if (!team) {
        this.logger.warn(`Hard delete failed: team ${id} not found`);
        throw new NotFoundException(`Team with ID ${id} not found`);
      }

      const deletedTeam = await this.prismaService.team.delete({
        where: { id },
      });

      this.logger.warn(`Team permanently deleted: ${deletedTeam.id}`);
      return deletedTeam;
    } catch (error) {
      this.logger.error(`Database error hard deleting team ${id}`, error.stack);
      throw error;
    }
  }

  // ==========================================
  // QUERY OPERATIONS
  // ==========================================

  // ==========================================
  // FRONTEND-DRIVEN OPERATIONS
  // ==========================================
}
