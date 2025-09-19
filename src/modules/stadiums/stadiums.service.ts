import {
  CreateStadiumRequestDto,
  StadiumResponseDto,
  UpdateStadiumRequestDto,
} from '@/modules/stadiums/dtos';
import { StadiumsRepository } from '@/modules/stadiums/stadiums.repository';
import { Injectable } from '@nestjs/common';
import { Stadium } from '@prisma/client';

@Injectable()
export class StadiumsService {
  constructor(private readonly stadiumsRepository: StadiumsRepository) {}

  async create(
    createStadiumRequestDto: CreateStadiumRequestDto,
  ): Promise<StadiumResponseDto> {
    const slug = this.generateSlug(
      createStadiumRequestDto.name,
      createStadiumRequestDto.city,
    );

    const stadium = await this.stadiumsRepository.create({
      ...createStadiumRequestDto,
      slug,
    });

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
    updateStadiumRequestDto: UpdateStadiumRequestDto,
  ): Promise<StadiumResponseDto> {
    let slug: string;

    if (updateStadiumRequestDto.name || updateStadiumRequestDto.city) {
      const stadium = await this.stadiumsRepository.findByIdOrThrow(id);
      const newName = updateStadiumRequestDto.name ?? stadium.name;
      const newCity = updateStadiumRequestDto.city ?? stadium.city;
      slug = this.generateSlug(newName, newCity);
    }

    const updatedStadium = await this.stadiumsRepository.update(id, {
      ...updateStadiumRequestDto,
      ...(slug && { slug }),
    });

    return this.toResponseDto(updatedStadium);
  }

  async softDelete(id: number): Promise<StadiumResponseDto> {
    const stadium = await this.stadiumsRepository.softDelete(id);
    return this.toResponseDto(stadium);
  }

  async restore(id: number): Promise<StadiumResponseDto> {
    const stadium = await this.stadiumsRepository.restore(id);
    return this.toResponseDto(stadium);
  }

  async hardDelete(id: number): Promise<StadiumResponseDto> {
    const stadium = await this.stadiumsRepository.hardDelete(id);
    return this.toResponseDto(stadium);
  }

  private generateSlug(name: string, city: string): string {
    return `${name}-${city}`
      .toLowerCase()
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
