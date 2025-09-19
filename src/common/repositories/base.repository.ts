import { PrismaService } from '@/modules/prisma/prisma.service';
import { Logger, NotFoundException } from '@nestjs/common';

export interface BaseRepositoryInterface<T, CreateInput, UpdateInput> {
  create(data: CreateInput): Promise<T>;
  findAll(): Promise<T[]>;
  findById(id: number): Promise<T | null>;
  findByIdOrThrow(id: number): Promise<T>;
  update(id: number, data: UpdateInput): Promise<T>;
  softDelete(id: number): Promise<T>;
  restore(id: number): Promise<T>;
  hardDelete(id: number): Promise<T>;
}

export abstract class BaseRepository<T, CreateInput, UpdateInput>
  implements BaseRepositoryInterface<T, CreateInput, UpdateInput>
{
  protected readonly logger: Logger;

  constructor(
    protected readonly prismaService: PrismaService,
    protected modelName: string,
  ) {
    this.logger = new Logger(`${modelName}Repository`);
  }

  async create(data: CreateInput): Promise<T> {
    try {
      const model = this.getModel();
      const entity = await model.create({ data });

      this.logger.log(`${this.modelName} created: ${entity.id}`);
      return entity;
    } catch (error) {
      this.logger.error(
        `Database error creating ${this.modelName.toLowerCase()}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const model = this.getModel();
      const entities = await model.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'asc' },
      });

      return entities;
    } catch (error) {
      this.logger.error(
        `Database error fetching all ${this.modelName.toLowerCase()}s`,
        error.stack,
      );
      throw error;
    }
  }

  async findById(id: number): Promise<T | null> {
    try {
      const model = this.getModel();
      const entity = await model.findUnique({
        where: { id, deletedAt: null },
      });

      return entity;
    } catch (error) {
      this.logger.error(
        `Database error fetching ${this.modelName.toLowerCase()} by ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async findByIdOrThrow(id: number): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      this.logger.warn(`${this.modelName} lookup failed: ID ${id} not found`);
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }
    return entity;
  }

  async update(id: number, data: UpdateInput): Promise<T> {
    try {
      await this.findByIdOrThrow(id);

      const model = this.getModel();
      const entity = await model.update({
        where: { id },
        data,
      });

      this.logger.log(`${this.modelName} updated: ${entity.id}`);
      return entity;
    } catch (error) {
      this.logger.error(
        `Database error updating ${this.modelName.toLowerCase()} ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async softDelete(id: number): Promise<T> {
    try {
      await this.findByIdOrThrow(id);

      const model = this.getModel();
      const entity = await model.update({
        where: { id },
        data: { deletedAt: new Date() },
      });

      this.logger.log(`${this.modelName} soft deleted: ${entity.id}`);
      return entity;
    } catch (error) {
      this.logger.error(
        `Database error soft deleting ${this.modelName.toLowerCase()} ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async restore(id: number): Promise<T> {
    try {
      const model = this.getModel();
      const entity = await model.findUnique({
        where: { id },
      });
      if (!entity) {
        this.logger.warn(
          `Restore failed: ${this.modelName.toLowerCase()} ${id} not found`,
        );
        throw new NotFoundException(
          `${this.modelName} with ID ${id} not found`,
        );
      }

      const restoredEntity = await model.update({
        where: { id },
        data: { deletedAt: null },
      });

      this.logger.log(`${this.modelName} restored: ${restoredEntity.id}`);
      return restoredEntity;
    } catch (error) {
      this.logger.error(
        `Database error restoring ${this.modelName.toLowerCase()} ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async hardDelete(id: number): Promise<T> {
    try {
      const model = this.getModel();
      const entity = await model.findUnique({
        where: { id },
      });
      if (!entity) {
        this.logger.warn(
          `Hard delete failed: ${this.modelName.toLowerCase()} ${id} not found`,
        );
        throw new NotFoundException(
          `${this.modelName} with ID ${id} not found`,
        );
      }

      const deletedEntity = await model.delete({
        where: { id },
      });

      this.logger.warn(
        `${this.modelName} permanently deleted: ${deletedEntity.id}`,
      );
      return deletedEntity;
    } catch (error) {
      this.logger.error(
        `Database error hard deleting ${this.modelName.toLowerCase()} ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  protected getModel() {
    const modelName = this.modelName.toLowerCase();
    return this.prismaService[modelName];
  }
}
