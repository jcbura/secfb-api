import {
  BaseRepository,
  PrismaClientOrTransaction,
} from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

export interface CoreRepositoryInterface<T, CreateInput, UpdateInput>
  extends BaseRepository<T, CreateInput, UpdateInput> {
  findBySlug(
    slug: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T | null>;
  findBySlugOrThrow(
    slug: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T>;
  findByIdentifier(
    identifier: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T | null>;
  findByIdentifierOrThrow(
    identifier: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T>;
}

export abstract class CoreRepository<T, CreateInput, UpdateInput>
  extends BaseRepository<T, CreateInput, UpdateInput>
  implements CoreRepositoryInterface<T, CreateInput, UpdateInput>
{
  constructor(
    protected readonly prismaService: PrismaService,
    protected modelName: string,
  ) {
    super(prismaService, modelName);
  }

  async findBySlug(
    slug: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T | null> {
    try {
      const model = this.getModel(client);
      const entity = await model.findUnique({
        where: { slug },
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

  async findBySlugOrThrow(
    slug: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T> {
    const entity = await this.findBySlug(slug, client);
    if (!entity) {
      this.logger.warn(
        `Lookup failed: ${this.modelName.toLowerCase()} with slug ${slug} not found`,
      );
      throw new NotFoundException(
        `${this.modelName} with slug ${slug} not found`,
      );
    }
    return entity;
  }

  async findByIdentifier(
    identifier: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T | null> {
    const numericId = parseInt(identifier, 10);
    if (!isNaN(numericId) && numericId.toString() === identifier) {
      return this.findById(numericId, client);
    }
    return this.findBySlug(identifier, client);
  }

  async findByIdentifierOrThrow(
    identifier: string,
    client?: PrismaClientOrTransaction,
  ): Promise<T> {
    const entity = await this.findByIdentifier(identifier, client);
    if (!entity) {
      this.logger.warn(
        `Lookup failed: ${this.modelName.toLowerCase()} with identifier ${identifier} not found`,
      );
      throw new NotFoundException(
        `${this.modelName} with identifier ${identifier} not found`,
      );
    }
    return entity;
  }

  protected getModel(client?: PrismaClientOrTransaction) {
    const prismaClient = client || this.prismaService;
    const modelName = this.modelName.toLowerCase();
    return prismaClient[modelName];
  }
}
