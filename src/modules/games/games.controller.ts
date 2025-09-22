import { Auth } from '@/common/decorators';
import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import {
  CreateGameCompleteRequestDto,
  FinalizeGameRequestDto,
  GameCompleteResponseDto,
  GameResponseDto,
  UpdateGameRequestDto,
  UpdateParticipantsRequestDto,
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
    description: 'Created game successfully',
    type: class CreateGameCompleteResponseDto extends withBaseResponse(
      GameCompleteResponseDto,
    ) {},
  })
  @Auth()
  @Post()
  async create() {}

  @ApiOperation({ summary: 'Find all games' })
  @ApiResponse({
    status: 200,
    description: 'Found all games successfully',
    type: class FindAllGamesCompleteResponseDto extends withBaseArrayResponse(
      GameCompleteResponseDto,
    ) {},
  })
  @Get()
  async findAll() {}

  @ApiOperation({ summary: 'Find game by ID or slug' })
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
    description: 'Found game by ID or slug successfully',
    type: class FindGameCompleteResponseDto extends withBaseResponse(
      GameCompleteResponseDto,
    ) {},
  })
  @Get(':identifier')
  async findByIdentifier() {}

  @ApiOperation({ summary: 'Update game by ID' })
  @ApiBody({ type: UpdateGameRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Updated game by ID successfully',
    type: class UpdateGameResponseDto extends withBaseResponse(
      GameResponseDto,
    ) {},
  })
  @Auth()
  @Patch(':id')
  async update() {}

  @ApiOperation({ summary: 'Delete game by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Deleted game by ID successfully',
    type: class DeletedGameResponseDto extends withBaseResponse(
      GameResponseDto,
    ) {},
  })
  @Auth()
  @Delete(':id')
  async delete() {}

  @ApiOperation({ summary: 'Update game participants by game ID' })
  @ApiBody({ type: UpdateParticipantsRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Updated by participants by game ID',
    type: class UpdateParticipantsResponseDto extends withBaseResponse(
      GameCompleteResponseDto,
    ) {},
  })
  @Auth()
  @Patch(':id/participants')
  async updateParticipants() {}

  @ApiOperation({ summary: 'Finalize game by game ID' })
  @ApiBody({ type: FinalizeGameRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Finalized game by game ID',
    type: class FinalizeGameResponseDto extends withBaseResponse(
      GameCompleteResponseDto,
    ) {},
  })
  @Auth()
  @Post(':id/finalize')
  async finalize() {}
}
