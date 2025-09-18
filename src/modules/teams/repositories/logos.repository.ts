import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Logo, Prisma } from '@prisma/client';

@Injectable()
export class LogosRepository {
  private readonly logger = new Logger(LogosRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  private async validateTeamExists(teamId: number): Promise<void> {
    const teamExists = await this.prismaService.team.findUnique({
      where: { id: teamId, deletedAt: null },
    });
    if (!teamExists) {
      this.logger.warn(`Team lookup failed: ID ${teamId} not found`);
      throw new NotFoundException(`Team with ID ${teamId} not found`);
    }
  }

  // ==========================================
  // CORE CRUD OPERATIONS
  // ==========================================

  async create(
    teamId: number,
    data: Prisma.LogoCreateWithoutTeamInput,
  ): Promise<Logo> {
    try {
      await this.validateTeamExists(teamId);

      const logo = await this.prismaService.logo.create({
        data: {
          ...data,
          team: { connect: { id: teamId } },
        },
      });

      this.logger.log(`Logo created: ${logo.id}`);
      return logo;
    } catch (error) {
      this.logger.error('Database error creating logo', error.stack);
      throw error;
    }
  }

  async findByTeam(teamId: number): Promise<Logo | null> {
    try {
      await this.validateTeamExists(teamId);

      const logo = await this.prismaService.logo.findUnique({
        where: { teamId, deletedAt: null },
      });

      return logo;
    } catch (error) {
      this.logger.error(
        `Database error fetching logo by team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByTeamOrThrow(teamId: number): Promise<Logo> {
    const logo = await this.findByTeam(teamId);
    if (!logo) {
      this.logger.warn(
        `Logo lookup failed: logo for team ID ${teamId} not found`,
      );
      throw new NotFoundException(`Logo for team ID ${teamId} not found`);
    }
    return logo;
  }

  async update(
    teamId: number,
    data: Prisma.LogoUpdateWithoutTeamInput,
  ): Promise<Logo> {
    try {
      await this.findByTeamOrThrow(teamId);

      const logo = await this.prismaService.logo.update({
        where: { teamId },
        data,
      });

      this.logger.log(`Logo updated: ${logo.id}`);
      return logo;
    } catch (error) {
      this.logger.error(
        `Database error updating logo for team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async softDelete(teamId: number): Promise<Logo> {
    try {
      await this.findByTeamOrThrow(teamId);

      const logo = await this.prismaService.logo.update({
        where: { teamId },
        data: { deletedAt: new Date() },
      });

      this.logger.log(`Logo soft deleted: ${logo.id}`);
      return logo;
    } catch (error) {
      this.logger.error(
        `Database error soft deleting logo for team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async restore(teamId: number): Promise<Logo> {
    try {
      await this.validateTeamExists(teamId);

      const logo = await this.prismaService.logo.findUnique({
        where: { teamId },
      });
      if (!logo) {
        this.logger.warn(
          `Restore failed: logo for team ID ${teamId} not found`,
        );
        throw new NotFoundException(`Logo for team ID ${teamId} not found`);
      }

      const restoredLogo = await this.prismaService.logo.update({
        where: { teamId },
        data: { deletedAt: null },
      });

      this.logger.log(`Logo restored: ${restoredLogo.id}`);
      return restoredLogo;
    } catch (error) {
      this.logger.error(
        `Database error restoring logo for team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }

  async hardDelete(teamId: number): Promise<Logo> {
    try {
      await this.validateTeamExists(teamId);

      const logo = await this.prismaService.logo.findUnique({
        where: { teamId },
      });
      if (!logo) {
        this.logger.warn(
          `Hard delete failed: logo for team ID ${teamId} not found`,
        );
        throw new NotFoundException(`Logo for team ID ${teamId} not found`);
      }

      const deletedLogo = await this.prismaService.logo.delete({
        where: { teamId },
      });

      this.logger.log(`Logo permanently deleted: ${deletedLogo.id}`);
      return deletedLogo;
    } catch (error) {
      this.logger.error(
        `Database error hard deleting logo for team ID ${teamId}`,
        error.stack,
      );
      throw error;
    }
  }
}
