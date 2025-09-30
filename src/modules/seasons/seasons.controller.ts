import { Auth, Identifier } from '@/common/decorators';
import { CreateSeasonDto, UpdateSeasonDto } from '@/modules/seasons/dtos';
import { SeasonsService } from '@/modules/seasons/seasons.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Seasons')
@Controller('seasons')
export class SeasonsController {
  constructor(private readonly seasonsService: SeasonsService) {}

  @ApiOperation({ summary: 'Create season' })
  @Auth()
  @Post()
  async create(@Body() dto: CreateSeasonDto) {
    return this.seasonsService.create(dto);
  }

  @ApiOperation({ summary: 'Find seasons' })
  @Get()
  async findMany() {
    return this.seasonsService.findMany();
  }

  @ApiOperation({ summary: 'Find season' })
  @Identifier('2025-2026')
  @Get(':identifier')
  async find(@Param('identifier') identifier: string) {
    return this.seasonsService.find(identifier);
  }

  @ApiOperation({ summary: 'Update season' })
  @Identifier('2025-2026')
  @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateSeasonDto,
  ) {
    return this.seasonsService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete season' })
  @Identifier('2025-2026')
  @Auth()
  @Delete(':identifier')
  async delete(@Param('identifier') identifier: string) {
    return this.seasonsService.delete(identifier);
  }

  @ApiOperation({ summary: 'Set current season' })
  @Identifier('2025-2026')
  @Auth()
  @Patch(':identifier/current')
  async setCurrent(@Param('identifier') identifier: string) {
    return this.seasonsService.setCurrent(identifier);
  }
}
