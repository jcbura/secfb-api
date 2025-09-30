import { Auth, Identifier } from '@/common/decorators';
import {
  CreateGameDto,
  FinalizeGameDto,
  UpdateGameDto,
  UpdateScoreDto,
} from '@/modules/games/dtos';
import { GamesService } from '@/modules/games/games.service';
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

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Create game' })
  // @Auth()
  @Post()
  async create(@Body() dto: CreateGameDto) {
    return this.gamesService.create(dto);
  }

  @ApiOperation({ summary: 'Find games' })
  @Get()
  async findMany() {
    return this.gamesService.findMany();
  }

  @ApiOperation({ summary: 'Find game' })
  @Identifier('2025-11-29-ala-aub')
  @Get(':identifier')
  async find(@Param('identifier') identifier: string) {
    return this.gamesService.find(identifier);
  }

  @ApiOperation({ summary: 'Update game' })
  @Identifier('2025-11-29-ala-aub')
  // @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateGameDto,
  ) {
    return this.gamesService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete game' })
  @Identifier('2025-11-29-ala-aub')
  @Auth()
  @Delete(':identifier')
  async delete(@Param('identifier') identifier: string) {
    return this.gamesService.delete(identifier);
  }

  @ApiOperation({ summary: 'Update score' })
  @Identifier('2025-11-29-ala-aub')
  @Auth()
  @Patch(':identifier/score')
  async updateScore(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateScoreDto,
  ) {
    return this.gamesService.updateScore(identifier, dto);
  }

  @ApiOperation({ summary: 'Finalize game' })
  @Identifier('2025-11-29-ala-aub')
  @Auth()
  @Patch(':identifier/finalize')
  async finalizeGame(
    @Param('identifier') identifier: string,
    @Body() dto: FinalizeGameDto,
  ) {
    return this.gamesService.finalizeGame(identifier, dto);
  }
}
