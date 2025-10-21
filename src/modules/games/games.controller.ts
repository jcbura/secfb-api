import { Auth, Identifier } from '@/common/decorators';
import {
  BaseArrayGameResponseDto,
  BaseGameResponseDto,
  BulkCreateGamesDto,
  CreateGameDto,
  FinalizeGameDto,
  GameResponseDto,
  QueryGameDto,
  UpdateGameDto,
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
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Create game' })
  @ApiCreatedResponse({ type: BaseGameResponseDto })
  @Auth()
  @Post()
  async create(@Body() dto: CreateGameDto): Promise<GameResponseDto> {
    return this.gamesService.create(dto);
  }

  @ApiOperation({ summary: 'Bulk create games' })
  @ApiCreatedResponse({ type: BaseArrayGameResponseDto })
  @Auth()
  @Post('bulk')
  async createMany(
    @Body() dto: BulkCreateGamesDto,
  ): Promise<GameResponseDto[]> {
    return this.gamesService.createMany(dto);
  }

  @ApiOperation({ summary: 'Find games' })
  @ApiOkResponse({ type: BaseArrayGameResponseDto })
  @Get()
  async findMany(@Query() query: QueryGameDto): Promise<GameResponseDto[]> {
    return this.gamesService.findMany(query);
  }

  @ApiOperation({ summary: 'Find game' })
  @ApiOkResponse({ type: BaseGameResponseDto })
  @Identifier('2025-11-29-ala-aub')
  @Get(':identifier')
  async find(
    @Param('identifier') identifier: string,
  ): Promise<GameResponseDto> {
    return this.gamesService.find(identifier);
  }

  @ApiOperation({ summary: 'Update game' })
  @ApiOkResponse({ type: BaseGameResponseDto })
  @Identifier('2025-11-29-ala-aub')
  @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateGameDto,
  ): Promise<GameResponseDto> {
    return this.gamesService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete game' })
  @ApiOkResponse({ type: BaseGameResponseDto })
  @Identifier('2025-11-29-ala-aub')
  @Auth()
  @Delete(':identifier')
  async delete(
    @Param('identifier') identifier: string,
  ): Promise<GameResponseDto> {
    return this.gamesService.delete(identifier);
  }

  @ApiOperation({ summary: 'Finalize game' })
  @ApiOkResponse({ type: BaseGameResponseDto })
  @Identifier('2025-11-29-ala-aub')
  @Auth()
  @Patch(':identifier/finalize')
  async finalize(
    @Param('identifier') identifier: string,
    @Body() dto: FinalizeGameDto,
  ): Promise<GameResponseDto> {
    return this.gamesService.finalizeGame(identifier, dto);
  }

  @ApiOperation({ summary: 'Unfinalize game' })
  @ApiOkResponse({ type: BaseGameResponseDto })
  @Identifier('2025-11-29-ala-aub')
  @Auth()
  @Patch(':identifier/unfinalize')
  async unfinalize(
    @Param('identifier') identifier: string,
  ): Promise<GameResponseDto> {
    return this.gamesService.unfinalizeGame(identifier);
  }
}
