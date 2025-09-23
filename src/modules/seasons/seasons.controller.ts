import { Auth } from '@/common/decorators';
import {
  BaseArraySeasonResponseDto,
  BaseSeasonResponseDto,
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
    type: BaseSeasonResponseDto,
  })
  @Auth()
  @Post()
  async create(
    @Body() dto: CreateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.create(dto);
  }

  @ApiOperation({ summary: 'Find all seasons' })
  @ApiResponse({
    status: 200,
    type: BaseArraySeasonResponseDto,
  })
  @Get()
  async findAll(): Promise<SeasonResponseDto[]> {
    return this.seasonsService.findAll();
  }

  @ApiOperation({ summary: 'Find season' })
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
    type: BaseSeasonResponseDto,
  })
  @Get(':identifier')
  async find(
    @Param('identifier') identifier: string,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.findByIdentifier(identifier);
  }

  @ApiOperation({
    summary: 'Update season',
  })
  @ApiBody({ type: UpdateSeasonRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseSeasonResponseDto,
  })
  @Auth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete season' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 204,
  })
  @Auth()
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.seasonsService.delete(id);
  }
}
