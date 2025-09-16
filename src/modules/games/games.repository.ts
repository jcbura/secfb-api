import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Game, Prisma } from '@prisma/client';

@Injectable()
export class GamesRepository {
  private readonly logger = new Logger(GamesRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  // ===========================
  // BASIC CRUD OPERATIONS
  // ===========================

  async findAll(): Promise<Game[]> {
    try {
      const games = await this.prismaService.game.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'asc' },
      });

      return games;
    } catch (error) {
      this.logger.error('Database error fetching all games', error.stack);
      throw error;
    }
  }

  async findById(id: number): Promise<Game | null> {
    try {
      const game = await this.prismaService.game.findUnique({
        where: { id, deletedAt: null },
      });

      return game;
    } catch (error) {
      this.logger.error(
        `Database error fetching game by ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async findBySlug(slug: string): Promise<Game | null> {
    try {
      const game = await this.prismaService.game.findUnique({
        where: { slug, deletedAt: null },
      });

      return game;
    } catch (error) {
      this.logger.error(
        `Database error fetching game by slug ${slug}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByIdOrThrow(id: number): Promise<Game> {
    const game = await this.findById(id);
    if (!game) {
      this.logger.warn(`Game lookup failed: ID ${id} not found`);
      throw new NotFoundException(`Game with ID ${id} not found`);
    }
    return game;
  }

  async findBySlugOrThrow(slug: string): Promise<Game> {
    const game = await this.findBySlug(slug);
    if (!game) {
      this.logger.warn(`Game lookup failed: slug ${slug} not found`);
      throw new NotFoundException(`Game with slug ${slug} not found`);
    }
    return game;
  }

  async create(data: Prisma.GameCreateInput): Promise<Game> {
    try {
      const game = await this.prismaService.game.create({ data });

      this.logger.log(`Game created: ${game.id}`);
      return game;
    } catch (error) {
      this.logger.error('Database error creating game', error.stack);
      throw error;
    }
  }

  async update(id: number, data: Prisma.GameUpdateInput): Promise<Game> {
    try {
      await this.findByIdOrThrow(id);

      const game = await this.prismaService.game.update({
        where: { id },
        data,
      });

      this.logger.log(`Game updated: ${game.id}`);
      return game;
    } catch (error) {
      this.logger.error(`Database error updating game ${id}`, error.stack);
      throw error;
    }
  }

  async softDelete(id: number): Promise<Game> {
    try {
      await this.findByIdOrThrow(id);

      const game = await this.prismaService.game.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      this.logger.log(`Game soft deleted: ${game.id}`);
      return game;
    } catch (error) {
      this.logger.error(`Database error soft deleting game ${id}`, error.stack);
      throw error;
    }
  }

  async restore(id: number): Promise<Game> {
    try {
      const game = await this.prismaService.game.findUnique({ where: { id } });
      if (!game) {
        this.logger.warn(`Restore failed: game ${id} not found`);
        throw new NotFoundException(`Game with ID ${id} not found`);
      }

      const restoredGame = await this.prismaService.game.update({
        where: { id },
        data: { deletedAt: null },
      });

      this.logger.log(`Game restored: ${restoredGame.id}`);
      return restoredGame;
    } catch (error) {
      this.logger.error(`Database error restoring game ${id}`, error.stack);
      throw error;
    }
  }

  async hardDelete(id: number): Promise<Game> {
    try {
      const game = await this.prismaService.game.findUnique({ where: { id } });
      if (!game) {
        this.logger.warn(`Hard delete failed: game ${id} not found`);
        throw new NotFoundException(`Game with ID ${id} not found`);
      }

      const deletedGame = await this.prismaService.game.delete({
        where: { id },
      });

      this.logger.warn(`Game permanently deleted: ${deletedGame.id}`);
      return deletedGame;
    } catch (error) {
      this.logger.error(`Database error hard deleting game ${id}`, error.stack);
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
