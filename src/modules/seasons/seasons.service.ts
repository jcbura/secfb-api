import {
  CreateSeasonRequestDto,
  SeasonResponseDto,
  UpdateSeasonRequestDto,
} from '@/modules/seasons/dtos';
import { SeasonsRepository } from '@/modules/seasons/repositories';
import { Injectable } from '@nestjs/common';
import { Season } from '@prisma/client';

@Injectable()
export class SeasonsService {
  constructor(private readonly seasonsRepository: SeasonsRepository) {}

  async create(
    createSeasonRequestDto: CreateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    const createData = { ...createSeasonRequestDto };

    createData.startDate = new Date(
      createSeasonRequestDto.startDate,
    ).toISOString();
    createData.endDate = new Date(createSeasonRequestDto.endDate).toISOString();

    const slug = this.generateSlug(createData.startDate, createData.endDate);

    const season = await this.seasonsRepository.create({
      ...createData,
      slug,
    });

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
    updateSeasonRequestDto: UpdateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    const updatedData = { ...updateSeasonRequestDto };
    let slug: string;

    if (updateSeasonRequestDto.startDate) {
      updatedData.startDate = new Date(
        updateSeasonRequestDto.startDate,
      ).toISOString();
    }
    if (updateSeasonRequestDto.endDate) {
      updatedData.endDate = new Date(
        updateSeasonRequestDto.endDate,
      ).toISOString();
    }

    if (updateSeasonRequestDto.startDate || updateSeasonRequestDto.endDate) {
      const season = await this.seasonsRepository.findByIdOrThrow(id);
      const newStartDate = updatedData.startDate ?? season.startDate;
      const newEndDate = updatedData.endDate ?? season.endDate;
      slug = this.generateSlug(newStartDate, newEndDate);
    }

    const updatedSeason = await this.seasonsRepository.update(id, {
      ...updatedData,
      ...(slug && { slug }),
    });

    return this.toResponseDto(updatedSeason);
  }

  async softDelete(id: number): Promise<SeasonResponseDto> {
    const season = await this.seasonsRepository.softDelete(id);
    return this.toResponseDto(season);
  }

  async restore(id: number): Promise<SeasonResponseDto> {
    const season = await this.seasonsRepository.restore(id);
    return this.toResponseDto(season);
  }

  async hardDelete(id: number): Promise<SeasonResponseDto> {
    const season = await this.seasonsRepository.hardDelete(id);
    return this.toResponseDto(season);
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
