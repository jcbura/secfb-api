import { parseIdentifier } from '@/common/utils';
import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  adaptStadiumsToDto,
  adaptStadiumToDto,
} from '@/modules/stadiums/adapters';
import {
  BulkCreateStadiumDto,
  CreateStadiumDto,
  QueryStadiumDto,
  StadiumResponseDto,
  UpdateStadiumDto,
} from '@/modules/stadiums/dtos';
import { TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Stadium } from '@prisma/client';

@Injectable()
export class StadiumsService {
  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async create(dto: CreateStadiumDto): Promise<StadiumResponseDto> {
    const data: Prisma.StadiumCreateInput = {
      ...dto,
      slug: this.generateSlug(dto.name, dto.city),
    };
    const stadium: Stadium = await this.txHost.tx.stadium.create({ data });
    return adaptStadiumToDto(stadium);
  }

  async createMany(dto: BulkCreateStadiumDto): Promise<StadiumResponseDto[]> {
    const data: Prisma.StadiumCreateManyInput[] = dto.stadiums.map(stadium => ({
      ...stadium,
      slug: this.generateSlug(stadium.name, stadium.city),
    }));
    const stadiums: Stadium[] =
      await this.txHost.tx.stadium.createManyAndReturn({ data });
    return adaptStadiumsToDto(stadiums);
  }

  async findMany(query: QueryStadiumDto): Promise<StadiumResponseDto[]> {
    const where = query.toWhereInput();
    const orderBy = query.toOrderByInput();
    const stadiums: Stadium[] = await this.txHost.tx.stadium.findMany({
      where,
      orderBy,
    });
    return adaptStadiumsToDto(stadiums);
  }

  async find(identifier: string): Promise<StadiumResponseDto> {
    const where = parseIdentifier(identifier);
    const stadium: Stadium = await this.txHost.tx.stadium.findUniqueOrThrow({
      where,
    });
    return adaptStadiumToDto(stadium);
  }

  async update(
    identifier: string,
    dto: UpdateStadiumDto,
  ): Promise<StadiumResponseDto> {
    const where = parseIdentifier(identifier);
    const data: Prisma.StadiumUpdateInput = { ...dto };

    if (dto.name || dto.city) {
      const existingStadium = await this.txHost.tx.stadium.findUniqueOrThrow({
        where,
        select: { name: true, city: true },
      });

      data.slug = this.generateSlug(
        dto.name ?? existingStadium.name,
        dto.city ?? existingStadium.city,
      );
    }

    const stadium: Stadium = await this.txHost.tx.stadium.update({
      where,
      data,
    });
    return adaptStadiumToDto(stadium);
  }

  async delete(identifier: string): Promise<StadiumResponseDto> {
    const where = parseIdentifier(identifier);
    const stadium: Stadium = await this.txHost.tx.stadium.delete({ where });
    return adaptStadiumToDto(stadium);
  }

  private generateSlug(name: string, city: string): string {
    return `${name}-${city}`
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}
