import { Auth } from '@/common/decorators';
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
    return this.seasonsService.findByIdentifier(identifier);
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
  @Auth()
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSeasonRequestDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete season by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Deleted season by ID successfully',
    type: class SoftDeletedSeasonResponseDto extends withBaseResponse(
      SeasonResponseDto,
    ) {},
  })
  @Auth()
  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.delete(id);
  }
}
