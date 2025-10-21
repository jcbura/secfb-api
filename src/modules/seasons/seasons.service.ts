import { parseIdentifier } from '@/common/utils';
import { PrismaService } from '@/modules/prisma/prisma.service';
import {
  adaptSeasonsToDto,
  adaptSeasonToDto,
} from '@/modules/seasons/adapters';
import {
  BulkCreateSeasonDto,
  CreateSeasonDto,
  QuerySeasonDto,
  SeasonResponseDto,
  UpdateSeasonDto,
} from '@/modules/seasons/dtos';
import { Transactional, TransactionHost } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Injectable } from '@nestjs/common';
import { Prisma, Season } from '@prisma/client';

@Injectable()
export class SeasonsService {
  constructor(
    private readonly txHost: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async create(dto: CreateSeasonDto): Promise<SeasonResponseDto> {
    const data: Prisma.SeasonCreateInput = {
      ...dto,
      slug: this.generateSlug(dto.startDate, dto.endDate),
      startDate: new Date(dto.startDate),
      endDate: new Date(dto.endDate),
    };
    const season: Season = await this.txHost.tx.season.create({ data });
    return adaptSeasonToDto(season);
  }

  async createMany(dto: BulkCreateSeasonDto): Promise<SeasonResponseDto[]> {
    const data: Prisma.SeasonCreateManyInput[] = dto.seasons.map(season => ({
      ...season,
      slug: this.generateSlug(season.startDate, season.endDate),
      startDate: new Date(season.startDate),
      endDate: new Date(season.endDate),
    }));
    const seasons: Season[] = await this.txHost.tx.season.createManyAndReturn({
      data,
    });
    return adaptSeasonsToDto(seasons);
  }

  async findMany(query: QuerySeasonDto): Promise<SeasonResponseDto[]> {
    const where = query.toWhereInput();
    const orderBy = query.toOrderByInput();
    const seasons: Season[] = await this.txHost.tx.season.findMany({
      where,
      orderBy,
    });
    return adaptSeasonsToDto(seasons);
  }

  async find(identifier: string): Promise<SeasonResponseDto> {
    const where = parseIdentifier(identifier);
    const season: Season = await this.txHost.tx.season.findUniqueOrThrow({
      where,
    });
    return adaptSeasonToDto(season);
  }

  async update(
    identifier: string,
    dto: UpdateSeasonDto,
  ): Promise<SeasonResponseDto> {
    const where = parseIdentifier(identifier);
    const data: Prisma.SeasonUpdateInput = { ...dto };

    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);

    if (dto.startDate || dto.endDate) {
      const existingSeason = await this.txHost.tx.season.findUniqueOrThrow({
        where,
        select: { startDate: true, endDate: true },
      });

      data.slug = this.generateSlug(
        dto.startDate ?? existingSeason.startDate.toISOString(),
        dto.endDate ?? existingSeason.endDate.toISOString(),
      );
    }

    const season: Season = await this.txHost.tx.season.update({ where, data });
    return adaptSeasonToDto(season);
  }

  async delete(identifier: string): Promise<SeasonResponseDto> {
    const where = parseIdentifier(identifier);
    const season: Season = await this.txHost.tx.season.delete({ where });
    return adaptSeasonToDto(season);
  }

  async findCurrent(): Promise<SeasonResponseDto> {
    const season: Season = await this.txHost.tx.season.findFirstOrThrow({
      where: { isCurrentSeason: true },
    });
    return adaptSeasonToDto(season);
  }

  @Transactional()
  async setCurrent(identifier: string): Promise<SeasonResponseDto> {
    const where = parseIdentifier(identifier);
    await this.txHost.tx.season.updateMany({
      data: { isCurrentSeason: false },
    });
    const season: Season = await this.txHost.tx.season.update({
      where,
      data: { isCurrentSeason: true },
    });
    return adaptSeasonToDto(season);
  }

  private generateSlug(start: string, end: string): string {
    return `${new Date(start).getFullYear()}-${new Date(end).getFullYear()}`;
  }
}
