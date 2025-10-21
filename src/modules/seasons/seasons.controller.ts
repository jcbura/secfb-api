import { Auth, Identifier } from '@/common/decorators';
import {
  BaseArraySeasonResponseDto,
  BaseSeasonResponseDto,
  BulkCreateSeasonDto,
  CreateSeasonDto,
  QuerySeasonDto,
  SeasonResponseDto,
  UpdateSeasonDto,
} from '@/modules/seasons/dtos';
import { SeasonsService } from '@/modules/seasons/seasons.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @ApiOperation({ summary: 'Create season' })
  @ApiCreatedResponse({ type: BaseSeasonResponseDto })
  @Auth()
  @Post()
  async create(@Body() dto: CreateSeasonDto): Promise<SeasonResponseDto> {
    return this.seasonsService.create(dto);
  }

  @ApiOperation({ summary: 'Bulk create seasons' })
  @ApiCreatedResponse({ type: BaseArraySeasonResponseDto })
  @Auth()
  @Post('bulk')
  async createMany(
    @Body() dto: BulkCreateSeasonDto,
  ): Promise<SeasonResponseDto[]> {
    return this.seasonsService.createMany(dto);
  }

  @ApiOperation({ summary: 'Find seasons' })
  @ApiOkResponse({ type: BaseArraySeasonResponseDto })
  @Get()
  async findMany(@Query() query: QuerySeasonDto): Promise<SeasonResponseDto[]> {
    return this.seasonsService.findMany(query);
  }

  @ApiOperation({ summary: 'Find season' })
  @ApiOkResponse({ type: BaseSeasonResponseDto })
  @Identifier('2025-2026')
  @Get(':identifier')
  async find(
    @Param('identifier') identifier: string,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.find(identifier);
  }

  @ApiOperation({ summary: 'Update season' })
  @ApiOkResponse({ type: BaseSeasonResponseDto })
  @Identifier('2025-2026')
  @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateSeasonDto,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete season' })
  @ApiOkResponse({ type: BaseSeasonResponseDto })
  @Identifier('2025-2026')
  @Auth()
  @Delete(':identifier')
  async delete(
    @Param('identifier') identifier: string,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.delete(identifier);
  }

  @ApiOperation({ summary: 'Set current season' })
  @ApiOkResponse({ type: BaseSeasonResponseDto })
  @Identifier('2025-2026')
  @Auth()
  @Patch(':identifier/current')
  async setCurrent(
    @Param('identifier') identifier: string,
  ): Promise<SeasonResponseDto> {
    return this.seasonsService.setCurrent(identifier);
  }
}
