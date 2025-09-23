import {
  CreateStadiumRequestDto,
  StadiumResponseDto,
  UpdateStadiumRequestDto,
} from '@/modules/stadiums/dtos';
import { StadiumsRepository } from '@/modules/stadiums/repositories';
import { Injectable } from '@nestjs/common';
import { Prisma, Stadium } from '@prisma/client';

@Injectable()
export class StadiumsService {
  constructor(private readonly stadiumsRepository: StadiumsRepository) {}

  async create(dto: CreateStadiumRequestDto): Promise<StadiumResponseDto> {
    const data: Prisma.StadiumCreateInput = this.buildCreateData(dto);

    const stadium = await this.stadiumsRepository.create(data);
    return this.toResponseDto(stadium);
  }

  async findAll(): Promise<StadiumResponseDto[]> {
    const stadiums = await this.stadiumsRepository.findAll();
    return stadiums.map(stadium => this.toResponseDto(stadium));
  }

  async findByIdentifier(identifier: string): Promise<StadiumResponseDto> {
    const stadium =
      await this.stadiumsRepository.findByIdentifierOrThrow(identifier);
    return this.toResponseDto(stadium);
  }

  async update(
    id: number,
    dto: UpdateStadiumRequestDto,
  ): Promise<StadiumResponseDto> {
    const data: Prisma.StadiumUpdateInput = await this.buildUpdateData(id, dto);

    const stadium = await this.stadiumsRepository.update(id, data);
    return this.toResponseDto(stadium);
  }

  async delete(id: number): Promise<void> {
    await this.stadiumsRepository.delete(id);
  }

  private buildCreateData(
    dto: CreateStadiumRequestDto,
  ): Prisma.StadiumCreateInput {
    return {
      ...dto,
      slug: this.generateSlug(dto.name, dto.city),
    };
  }

  private async buildUpdateData(
    id: number,
    dto: UpdateStadiumRequestDto,
  ): Promise<Prisma.StadiumUpdateInput> {
    const data: Prisma.StadiumUpdateInput = { ...dto };

    if (dto.name || dto.city) {
      const existingStadium = await this.stadiumsRepository.findByIdOrThrow(id);
      const newName = dto.name ?? existingStadium.name;
      const newCity = dto.city ?? existingStadium.city;

      data.slug = this.generateSlug(newName, newCity);
    }

    return data;
  }

  private generateSlug(name: string, city: string): string {
    return `${name}-${city}`
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[-\s]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private toResponseDto(stadium: Stadium): StadiumResponseDto {
    return {
      id: stadium.id,
      slug: stadium.slug,
      name: stadium.name,
      nickname: stadium.nickname,
      field: stadium.field,
      city: stadium.city,
      state: stadium.state,
      capacity: stadium.capacity,
    };
  }
}
