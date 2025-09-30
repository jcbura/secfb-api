import { parseIdentifier } from '@/common/utils';
import { CreateStadiumDto, UpdateStadiumDto } from '@/modules/stadiums/dtos';
import { StadiumsRepository } from '@/modules/stadiums/repositories';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class StadiumsService {
  constructor(private readonly stadiumsRepository: StadiumsRepository) {}

  async create(dto: CreateStadiumDto) {
    return this.stadiumsRepository.create({
      data: { ...dto, slug: this.generateSlug(dto.name, dto.city) },
    });
  }

  async findMany() {
    return this.stadiumsRepository.findMany({});
  }

  async find(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.stadiumsRepository.findUniqueOrThrow({ where });
  }

  async update(identifier: string, dto: UpdateStadiumDto) {
    const where = parseIdentifier(identifier);
    const data: Prisma.StadiumUpdateInput = { ...dto };

    if (dto.name || dto.city) {
      const existingStadium = await this.stadiumsRepository.findUniqueOrThrow({
        where,
        select: { name: true, city: true },
      });

      data.slug = this.generateSlug(
        dto.name ?? existingStadium.name,
        dto.city ?? existingStadium.city,
      );
    }

    return this.stadiumsRepository.update({ where, data });
  }

  async delete(identifier: string) {
    const where = parseIdentifier(identifier);
    return this.stadiumsRepository.delete({ where });
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
