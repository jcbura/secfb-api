import { PrismaService } from '@/modules/prisma/prisma.service';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Prisma } from '@prisma/client';

export abstract class BaseRepository<
  MainModel,
  FindFirstArgs,
  FindFirstOrThrowArgs,
  FindUniqueArgs,
  FindUniqueOrThrowArgs,
  CreateArgs,
  UpdateArgs,
  UpsertArgs,
  DeleteArgs,
  FindManyArgs,
  CreateManyArgs,
  UpdateManyArgs,
  DeleteManyArgs,
  CountArgs,
  AggregateArgs,
  GroupByArgs,
> {
  constructor(
    protected readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
    protected readonly modelName: Prisma.ModelName,
  ) {}

  async findFirst(args: FindFirstArgs): Promise<MainModel | null> {
    return await this.txHost.tx[this.modelName].findFirst(args);
  }

  async findFirstOrThrow(args: FindFirstOrThrowArgs): Promise<MainModel> {
    return await this.txHost.tx[this.modelName].findFirstOrThrow(args);
  }

  async findUnique(args: FindUniqueArgs): Promise<MainModel | null> {
    return await this.txHost.tx[this.modelName].findUnique(args);
  }

  async findUniqueOrThrow(args: FindUniqueOrThrowArgs): Promise<MainModel> {
    return await this.txHost.tx[this.modelName].findUniqueOrThrow(args);
  }

  async create(args: CreateArgs): Promise<MainModel> {
    return await this.txHost.tx[this.modelName].create(args);
  }

  async update(args: UpdateArgs): Promise<MainModel> {
    return await this.txHost.tx[this.modelName].update(args);
  }

  async upsert(args: UpsertArgs): Promise<MainModel> {
    return await this.txHost.tx[this.modelName].upsert(args);
  }

  async delete(args: DeleteArgs): Promise<MainModel> {
    return await this.txHost.tx[this.modelName].delete(args);
  }

  async findMany(args: FindManyArgs): Promise<MainModel[]> {
    return await this.txHost.tx[this.modelName].findMany(args);
  }

  async createMany(args: CreateManyArgs): Promise<Prisma.BatchPayload> {
    return await this.txHost.tx[this.modelName].createMany(args);
  }

  async updateMany(args: UpdateManyArgs): Promise<Prisma.BatchPayload> {
    return await this.txHost.tx[this.modelName].updateMany(args);
  }

  async deleteMany(args: DeleteManyArgs): Promise<Prisma.BatchPayload> {
    return await this.txHost.tx[this.modelName].deleteMany(args);
  }

  async count(args: CountArgs): Promise<number> {
    return await this.txHost.tx[this.modelName].count(args);
  }

  async aggregate(args: AggregateArgs): Promise<any> {
    return await this.txHost.tx[this.modelName].aggregate(args);
  }

  async groupBy(args: GroupByArgs): Promise<any> {
    return await this.txHost.tx[this.modelName].groupBy(args);
  }
}
