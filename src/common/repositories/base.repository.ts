import { PrismaService } from '@/modules/prisma/prisma.service';
import { Logger, NotFoundException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

export type PrismaTransaction = Parameters<
  Parameters<PrismaClient['$transaction']>[0]
>[0];
export type PrismaClientOrTransaction = PrismaClient | PrismaTransaction;
export interface BaseRepositoryInterface<T, CreateInput, UpdateInput> {
  create(data: CreateInput, client?: PrismaClientOrTransaction): Promise<T>;
  findAll(client?: PrismaClientOrTransaction): Promise<T[]>;
  findById(id: number, client?: PrismaClientOrTransaction): Promise<T | null>;
  findByIdOrThrow(id: number, client?: PrismaClientOrTransaction): Promise<T>;
  update(
    id: number,
    data: UpdateInput,
    client?: PrismaClientOrTransaction,
  ): Promise<T>;
  delete(id: number, client?: PrismaClientOrTransaction): Promise<T>;
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

  async create(
    data: CreateInput,
    client?: PrismaClientOrTransaction,
  ): Promise<T> {
    try {
      const model = this.getModel(client);
      const entity = await model.create({ data });

      this.logger.log(`${this.modelName} created with ID ${entity.id}`);
      return entity;
    } catch (error) {
      this.logger.error(
        `Database error creating ${this.modelName.toLowerCase()}`,
        error.stack,
      );
      throw error;
    }
  }

  async findAll(client?: PrismaClientOrTransaction): Promise<T[]> {
    try {
      const model = this.getModel(client);
      const entities = await model.findMany({
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

  async findById(
    id: number,
    client?: PrismaClientOrTransaction,
  ): Promise<T | null> {
    try {
      const model = this.getModel(client);
      const entity = await model.findUnique({
        where: { id },
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

  async findByIdOrThrow(
    id: number,
    client?: PrismaClientOrTransaction,
  ): Promise<T> {
    const entity = await this.findById(id, client);
    if (!entity) {
      this.logger.warn(
        `Lookup failed: ${this.modelName.toLowerCase()} with ID ${id} not found`,
      );
      throw new NotFoundException(`${this.modelName} with ID ${id} not found`);
    }
    return entity;
  }

  async update(
    id: number,
    data: UpdateInput,
    client?: PrismaClientOrTransaction,
  ): Promise<T> {
    try {
      await this.findByIdOrThrow(id, client);

      const model = this.getModel(client);
      const entity = await model.update({
        where: { id },
        data,
      });

      this.logger.log(`${this.modelName} updated with ID ${entity.id}`);
      return entity;
    } catch (error) {
      this.logger.error(
        `Database error updating ${this.modelName.toLowerCase()} with ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  async delete(id: number, client?: PrismaClientOrTransaction): Promise<T> {
    try {
      await this.findByIdOrThrow(id, client);

      const model = this.getModel(client);
      const entity = await model.delete({
        where: { id },
      });

      this.logger.log(`${this.modelName} deleted with ID ${entity.id}`);
      return entity;
    } catch (error) {
      this.logger.error(
        `Database error deleting ${this.modelName.toLowerCase()} with ID ${id}`,
        error.stack,
      );
      throw error;
    }
  }

  protected getModel(client?: PrismaClientOrTransaction) {
    const prismaClient = client || this.prismaService;
    const modelName = this.modelName.toLowerCase();
    return prismaClient[modelName];
  }
}
