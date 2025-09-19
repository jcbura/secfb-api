import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export abstract class CoreRepository<
  T,
  CreateInput,
  UpdateInput,
> extends BaseRepository<T, CreateInput, UpdateInput> {
  constructor(
    protected readonly prismaService: PrismaService,
    protected modelName: string,
  ) {
    super(prismaService, modelName);
  }

  async findBySlug(slug: string): Promise<T | null> {
    try {
      const model = this.getModel();
      const entity = await model.findUnique({
        where: { slug, deletedAt: null },
      });

      return entity;
    } catch (error) {
      this.logger.error(
        `Database error fetching ${this.modelName.toLowerCase()} by slug ${slug}`,
        error.stack,
      );
      throw error;
    }
  }

  async findBySlugOrThrow(slug: string): Promise<T> {
    const entity = await this.findBySlug(slug);
    if (!entity) {
      this.logger.warn(
        `${this.modelName} lookup failed: slug ${slug} not found`,
      );
      throw new NotFoundException(
        `${this.modelName} with slug ${slug} not found`,
      );
    }
    return entity;
  }

  async findByIdentifier(identifier: string): Promise<T | null> {
    const numericId = parseInt(identifier, 10);
    if (!isNaN(numericId) && numericId.toString() === identifier) {
      return this.findById(numericId);
    }
    return this.findBySlug(identifier);
  }

  async findByIdentifierOrThrow(identifier: string): Promise<T> {
    const entity = await this.findByIdentifier(identifier);
    if (!entity) {
      this.logger.warn(
        `${this.modelName} lookup failed: identifier ${identifier} not found`,
      );
      throw new NotFoundException(
        `${this.modelName} with identifier ${identifier} not found`,
      );
    }
    return entity;
  }

  protected getModel() {
    const modelName = this.modelName.toLowerCase();
    return this.prismaService[modelName];
  }
}
