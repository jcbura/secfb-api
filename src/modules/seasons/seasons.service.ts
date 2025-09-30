import { parseIdentifier } from '@/common/utils';
import { CreateSeasonDto, UpdateSeasonDto } from '@/modules/seasons/dtos';
import { SeasonsRepository } from '@/modules/seasons/repositories';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class SeasonsService {
  constructor(private readonly seasonsRepository: SeasonsRepository) {}

  async create(dto: CreateSeasonDto) {
    return this.seasonsRepository.create({
      data: {
        ...dto,
        slug: this.generateSlug(dto.startDate, dto.endDate),
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
      },
    });
  }

  async findMany() {
    return this.seasonsRepository.findMany({});
  }

  async find(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.seasonsRepository.findUniqueOrThrow({ where });
  }

  async update(identifier: string, dto: UpdateSeasonDto) {
    const where = parseIdentifier(identifier);
    const data: Prisma.SeasonUpdateInput = { ...dto };

    if (dto.startDate) data.startDate = new Date(dto.startDate);
    if (dto.endDate) data.endDate = new Date(dto.endDate);

    if (dto.startDate || dto.endDate) {
      const existingSeason = await this.seasonsRepository.findUniqueOrThrow({
        where,
        select: { startDate: true, endDate: true },
      });

      data.slug = this.generateSlug(
        dto.startDate ?? existingSeason.startDate.toISOString(),
        dto.endDate ?? existingSeason.endDate.toISOString(),
      );
    }

    return this.seasonsRepository.update({ where, data });
  }

  async delete(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.seasonsRepository.delete({ where });
  }

  async setCurrent(identifier: string) {
    const where = parseIdentifier(identifier);
    await this.seasonsRepository.updateMany({
      data: { isCurrentSeason: false },
    });
    return this.seasonsRepository.update({
      where,
      data: { isCurrentSeason: true },
    });
  }

  private generateSlug(start: string, end: string): string {
    return `${new Date(start).getFullYear()}-${new Date(end).getFullYear()}`;
  }
}
