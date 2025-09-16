import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import {
  CreateSeasonRequestDto,
  SeasonResponseDto,
  UpdateSeasonRequestDto,
} from '@/modules/seasons/dtos';
import { SeasonsService } from '@/modules/seasons/seasons.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @ApiOperation({ summary: 'Create season' })
  @ApiBody({ type: CreateSeasonRequestDto })
  @ApiResponse({
    status: 201,
    description: 'Created season successfully',
    type: class CreateSeasonResponseDto extends withBaseResponse(
      SeasonResponseDto,
    ) {},
  })
  @Post()
  async create(
    @Body() createSeasonRequestDto: CreateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.create(createSeasonRequestDto);
  }

  @ApiOperation({ summary: 'Find all seasons' })
  @ApiResponse({
    status: 200,
    description: 'Found all seasons successfully',
    type: class FindAllSeasonsResponseDto extends withBaseArrayResponse(
      SeasonResponseDto,
    ) {},
  })
  @Get()
  async findAll(): Promise<SeasonResponseDto[]> {
    return this.seasonsService.findAll();
  }

  @ApiOperation({ summary: 'Find season by ID or slug' })
  @ApiParam({
    name: 'identifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: { value: '2025-2026', description: 'Find by slug' },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Found season by ID or slug successfully',
    type: class FindSeasonResponseDto extends withBaseResponse(
      SeasonResponseDto,
    ) {},
  })
  @Get(':identifier')
  async findByIdentifier(
    @Param('identifier') identifier: string,
  ): Promise<SeasonResponseDto> {
    const numericId = parseInt(identifier, 10);
    if (!isNaN(numericId) && numericId.toString() === identifier) {
      return this.seasonsService.findById(numericId);
    }

    return this.seasonsService.findBySlug(identifier);
  }

  @ApiOperation({
    summary: 'Update season by ID',
  })
  @ApiBody({ type: UpdateSeasonRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Updated season by ID successfully',
    type: class UpdateSeasonResponseDto extends withBaseResponse(
      SeasonResponseDto,
    ) {},
  })
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSeasonRequestDto: UpdateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.update(id, updateSeasonRequestDto);
  }

  @ApiOperation({ summary: 'Soft delete season by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Soft deleted season by ID successfully',
    type: class SoftDeletedSeasonResponseDto extends withBaseResponse(
      SeasonResponseDto,
    ) {},
  })
  @Delete(':id')
  async softDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.softDelete(id);
  }

  @ApiOperation({ summary: 'Restore soft-deleted season by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Restored soft-deleted season by ID successfully',
    type: class RestoredSeasonResponseDto extends withBaseResponse(
      SeasonResponseDto,
    ) {},
  })
  @Patch(':id/restore')
  async restore(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.restore(id);
  }

  @ApiOperation({ summary: 'Hard delete stadium by ID' })
  @ApiParam({
    name: 'id',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Hard deleted season by ID successfully',
    type: class HardDeletedSeasonResponseDto extends withBaseResponse(
      SeasonResponseDto,
    ) {},
  })
  @Delete(':id/hard')
  async hardDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.hardDelete(id);
  }
}
