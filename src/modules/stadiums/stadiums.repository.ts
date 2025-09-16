import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Prisma, Stadium } from '@prisma/client';

@Injectable()
export class StadiumsRepository {
  private readonly logger = new Logger(StadiumsRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ===========================
  // BASIC CRUD OPERATIONS
  // ===========================

  async findAll(): Promise<Stadium[]> {
    try {
      const stadiums = await this.prismaService.stadium.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'asc' },
      });

      return stadiums;
    } catch (error) {
      this.logger.error('Database error fetching all stadiums', error.stack);
      throw error;
    }
  }

  async findById(id: number): Promise<Stadium | null> {
    try {
      const stadium = await this.prismaService.stadium.findUnique({
        where: { id, deletedAt: null },
      });

      return stadium;
    } catch (error) {
      this.logger.error(
        `Database error fetching stadium by ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<Stadium | null> {
    try {
      const stadium = await this.prismaService.stadium.findUnique({
        where: { slug, deletedAt: null },
      });

      return stadium;
    } catch (error) {
      this.logger.error(
        `Database error fetching stadium by slug ${slug}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByIdOrThrow(id: number): Promise<Stadium> {
    const stadium = await this.findById(id);
    if (!stadium) {
      this.logger.warn(`Stadium lookup failed: ID ${id} not found`);
      throw new NotFoundException(`Stadium with ID ${id} not found`);
    }
    return stadium;
  }

  async findBySlugOrThrow(slug: string): Promise<Stadium> {
    const stadium = await this.findBySlug(slug);
    if (!stadium) {
      this.logger.warn(`Stadium lookup failed: slug ${slug} not found`);
      throw new NotFoundException(`Stadium with slug ${slug} not found`);
    }
    return stadium;
  }

  async create(data: Prisma.StadiumCreateInput): Promise<Stadium> {
    try {
      const stadium = await this.prismaService.stadium.create({ data });

      this.logger.log(`Stadium created: ${stadium.id}`);
      return stadium;
    } catch (error) {
      this.logger.error('Database error creating stadium', error.stack);
      throw error;
    }
  }

  async update(id: number, data: Prisma.StadiumUpdateInput): Promise<Stadium> {
    try {
      await this.findByIdOrThrow(id);

      const stadium = await this.prismaService.stadium.update({
        where: { id },
        data,
      });

      this.logger.log(`Stadium updated: ${stadium.id}`);
      return stadium;
    } catch (error) {
      this.logger.error(`Database error updating stadium ${id}`, error.stack);
      throw error;
    }
  }

  async softDelete(id: number): Promise<Stadium> {
    try {
      await this.findByIdOrThrow(id);

      const stadium = await this.prismaService.stadium.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      this.logger.log(`Stadium soft deleted: ${stadium.id}`);
      return stadium;
    } catch (error) {
      this.logger.error(
        `Database error soft deleting stadium ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async restore(id: number): Promise<Stadium> {
    try {
      const stadium = await this.prismaService.stadium.findUnique({
        where: { id },
      });
      if (!stadium) {
        this.logger.warn(`Restore failed: stadium ${id} not found`);
        throw new NotFoundException(`Stadium with ID ${id} not found`);
      }

      const restoredStadium = await this.prismaService.stadium.update({
        where: { id },
        data: { deletedAt: null },
      });

      this.logger.log(`Stadium restored: ${restoredStadium.id}`);
      return restoredStadium;
    } catch (error) {
      this.logger.error(`Database error restoring stadium ${id}`, error.stack);
      throw error;
    }
  }

  async hardDelete(id: number): Promise<Stadium> {
    try {
      const stadium = await this.prismaService.stadium.findUnique({
        where: { id },
      });
      if (!stadium) {
        this.logger.warn(`Hard delete failed: stadium ${id} not found`);
        throw new NotFoundException(`Stadium with ID ${id} not found`);
      }

      const deletedStadium = await this.prismaService.stadium.delete({
        where: { id },
      });

      this.logger.warn(`Stadium permanently deleted: ${deletedStadium.id}`);
      return deletedStadium;
    } catch (error) {
      this.logger.error(
        `Database error hard deleting stadium ${id}`,
        error.stack,
      );
      throw error;
    }
  }
}
