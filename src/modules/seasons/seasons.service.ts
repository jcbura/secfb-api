import {
  CreateSeasonRequestDto,
  SeasonResponseDto,
  UpdateSeasonRequestDto,
} from '@/modules/seasons/dtos';
import { SeasonsRepository } from '@/modules/seasons/repositories';
import { Injectable } from '@nestjs/common';
import { Prisma, Season } from '@prisma/client';

@Injectable()
export class SeasonsService {
  constructor(private readonly seasonsRepository: SeasonsRepository) {}

  async create(dto: CreateSeasonRequestDto): Promise<SeasonResponseDto> {
    const data: Prisma.SeasonCreateInput = this.buildCreateData(dto);

    const season = await this.seasonsRepository.create(data);
    return this.toResponseDto(season);
  }

  async findAll(): Promise<SeasonResponseDto[]> {
    const seasons = await this.seasonsRepository.findAll();
    return seasons.map(season => this.toResponseDto(season));
  }

  async findByIdentifier(identifier: string): Promise<SeasonResponseDto> {
    const season =
      await this.seasonsRepository.findByIdentifierOrThrow(identifier);
    return this.toResponseDto(season);
  }

  async update(
    id: number,
    dto: UpdateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    const data: Prisma.SeasonUpdateInput = await this.buildUpdateData(id, dto);

    const season = await this.seasonsRepository.update(id, data);
    return this.toResponseDto(season);
  }

  async delete(id: number): Promise<SeasonResponseDto> {
    const season = await this.seasonsRepository.delete(id);
    return this.toResponseDto(season);
  }

  private buildCreateData(
    dto: CreateSeasonRequestDto,
  ): Prisma.SeasonCreateInput {
    const startDate = new Date(dto.startDate).toISOString();
    const endDate = new Date(dto.endDate).toISOString();

    return {
      ...dto,
      startDate,
      endDate,
      slug: this.generateSlug(startDate, endDate),
    };
  }

  private async buildUpdateData(
    id: number,
    dto: UpdateSeasonRequestDto,
  ): Promise<Prisma.SeasonUpdateInput> {
    const data: Prisma.SeasonUpdateInput = { ...dto };

    const startDate = dto.startDate
      ? new Date(dto.startDate).toISOString()
      : undefined;
    const endDate = dto.endDate
      ? new Date(dto.endDate).toISOString()
      : undefined;

    if (startDate) data.startDate = startDate;
    if (endDate) data.endDate = endDate;

    if (startDate || endDate) {
      const existingStadium = await this.seasonsRepository.findByIdOrThrow(id);

      data.slug = this.generateSlug(
        startDate ?? existingStadium.startDate,
        endDate ?? existingStadium.endDate,
      );
    }

    return data;
  }

  private generateSlug(start: string | Date, end: string | Date): string {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    return `${startYear}-${endYear}`;
  }

  private toResponseDto(season: Season): SeasonResponseDto {
    return {
      id: season.id,
      slug: season.slug,
      name: season.name,
      startDate: season.startDate.toISOString(),
      endDate: season.endDate.toISOString(),
      isCurrentSeason: season.isCurrentSeason,
    };
  }
}
