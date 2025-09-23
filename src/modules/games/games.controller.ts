import { Auth } from '@/common/decorators';
import {
  BaseArrayGameCompleteResponseDto,
  BaseGameCompleteResponseDto,
  BaseGameResponseDto,
  CreateGameCompleteRequestDto,
  FinalizeGameRequestDto,
  ParticipantsRequestDto,
  UpdateGameRequestDto,
} from '@/modules/games/dtos';
import { GamesService } from '@/modules/games/games.service';
import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Games')
@Controller('games')
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  @ApiOperation({ summary: 'Create game' })
  @ApiBody({ type: CreateGameCompleteRequestDto })
  @ApiResponse({
    status: 201,
    type: BaseGameCompleteResponseDto,
  })
  @Auth()
  @Post()
  async create() {}

  @ApiOperation({ summary: 'Find all games' })
  @ApiResponse({
    status: 200,
    type: BaseArrayGameCompleteResponseDto,
  })
  @Get()
  async findAll() {}

  @ApiOperation({ summary: 'Find game' })
  @ApiParam({
    name: 'identifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: { value: '2025-11-29-ala-aub', description: 'Find by slug' },
    },
  })
  @ApiResponse({
    status: 200,
    type: BaseGameCompleteResponseDto,
  })
  @Get(':identifier')
  async find() {}

  @ApiOperation({ summary: 'Update game' })
  @ApiBody({ type: UpdateGameRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseGameResponseDto,
  })
  @Auth()
  @Patch(':id')
  async update() {}

  @ApiOperation({ summary: 'Delete game' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 204,
  })
  @Auth()
  @Delete(':id')
  async delete() {}

  @ApiOperation({ summary: 'Update game participants' })
  @ApiBody({ type: ParticipantsRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseGameCompleteResponseDto,
  })
  @Auth()
  @Patch(':id/participants')
  async updateParticipants() {}

  @ApiOperation({ summary: 'Finalize game' })
  @ApiBody({ type: FinalizeGameRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseGameCompleteResponseDto,
  })
  @Auth()
  @Post(':id/finalize')
  async finalize() {}
}
