import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, Season } from '@prisma/client';

@Injectable()
export class SeasonsRepository {
  private readonly logger = new Logger(SeasonsRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ===========================
  // BASIC CRUD OPERATIONS
  // ===========================

  async findAll(): Promise<Season[]> {
    try {
      const seasons = await this.prismaService.season.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'asc' },
      });

      return seasons;
    } catch (error) {
      this.logger.error('Database error fetching all seasons', error.stack);
      throw error;
    }
  }

  async findById(id: number): Promise<Season | null> {
    try {
      const season = await this.prismaService.season.findUnique({
        where: { id, deletedAt: null },
      });

      return season;
    } catch (error) {
      this.logger.error(
        `Database error fetching season by ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<Season | null> {
    try {
      const season = await this.prismaService.season.findUnique({
        where: { slug, deletedAt: null },
      });

      return season;
    } catch (error) {
      this.logger.error(
        `Database error fetching season by slug ${slug}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByIdOrThrow(id: number): Promise<Season> {
    const season = await this.findById(id);
    if (!season) {
      this.logger.warn(`Season lookup failed: ID ${id} not found`);
      throw new NotFoundException(`Season with ID ${id} not found`);
    }
    return season;
  }

  async findBySlugOrThrow(slug: string): Promise<Season> {
    const season = await this.findBySlug(slug);
    if (!season) {
      this.logger.warn(`Season lookup failed: slug ${slug} not found`);
      throw new NotFoundException(`Season with slug ${slug} not found`);
    }
    return season;
  }

  async create(data: Prisma.SeasonCreateInput): Promise<Season> {
    try {
      const season = await this.prismaService.season.create({ data });

      this.logger.log(`Season created: ${season.id}`);
      return season;
    } catch (error) {
      this.logger.error('Database error creating season', error.stack);
      throw error;
    }
  }

  async update(id: number, data: Prisma.SeasonUpdateInput): Promise<Season> {
    try {
      await this.findByIdOrThrow(id);

      const season = await this.prismaService.season.update({
        where: { id },
        data,
      });

      this.logger.log(`Season updated: ${season.id}`);
      return season;
    } catch (error) {
      this.logger.error(`Database error updating season ${id}`, error.stack);
      throw error;
    }
  }

  async softDelete(id: number): Promise<Season> {
    try {
      await this.findByIdOrThrow(id);

      const season = await this.prismaService.season.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      this.logger.log(`Season soft deleted: ${season.id}`);
      return season;
    } catch (error) {
      this.logger.error(
        `Database error soft deleting season ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async restore(id: number): Promise<Season> {
    try {
      const season = await this.prismaService.season.findUnique({
        where: { id },
      });
      if (!season) {
        this.logger.warn(`Restore failed: season ${id} not found`);
        throw new NotFoundException(`Season with ID ${id} not found`);
      }

      const restoredSeason = await this.prismaService.season.update({
        where: { id },
        data: { deletedAt: null },
      });

      this.logger.log(`Season restored: ${restoredSeason.id}`);
      return restoredSeason;
    } catch (error) {
      this.logger.error(`Database error restoring season ${id}`, error.stack);
      throw error;
    }
  }

  async hardDelete(id: number): Promise<Season> {
    try {
      const season = await this.prismaService.season.findUnique({
        where: { id },
      });
      if (!season) {
        this.logger.warn(`Hard delete failed: season ${id} not found`);
        throw new NotFoundException(`Season with ID ${id} not found`);
      }

      const deletedSeason = await this.prismaService.season.delete({
        where: { id },
      });

      this.logger.warn(`Season permanently deleted: ${deletedSeason.id}`);
      return deletedSeason;
    } catch (error) {
      this.logger.error(
        `Database error hard deleting season ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  // ===========================
  // RELATIONSHIP QUERIES
  // ===========================

  // ===========================
  // FRONTEND-SPECIFIC QUERIES
  // ===========================
}
