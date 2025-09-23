import { Auth } from '@/common/decorators';
import {
  BaseArraySnapshotResponseDto,
  BaseArrayTeamResponseDto,
  BaseLogoResponseDto,
  BaseSnapshotResponseDto,
  BaseTeamCompleteResponseDto,
  BaseTeamResponseDto,
  CreateLogoRequestDto,
  CreateSnapshotRequestDto,
  CreateTeamCompleteRequestDto,
  UpdateLogoRequestDto,
  UpdateSnapshotRequestDto,
  UpdateTeamRequestDto,
} from '@/modules/teams/dtos';
import { TeamsService } from '@/modules/teams/teams.service';
import { Controller, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Create team' })
  @ApiBody({ type: CreateTeamCompleteRequestDto })
  @ApiResponse({
    status: 201,
    type: BaseTeamCompleteResponseDto,
  })
  @Auth()
  @Post()
  async create() {}

  @ApiOperation({ summary: 'Find all teams' })
  @ApiResponse({
    status: 200,
    type: BaseArrayTeamResponseDto,
  })
  @Get()
  async findAll() {}

  @ApiOperation({ summary: 'Find team' })
  @ApiParam({
    name: 'identifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: { value: 'alabama-crimson-tide', description: 'Find by slug' },
    },
  })
  @ApiResponse({
    status: 200,
    type: BaseTeamCompleteResponseDto,
  })
  @Get(':identifier')
  async find() {}

  @ApiOperation({ summary: 'Update team' })
  @ApiBody({ type: UpdateTeamRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseTeamResponseDto,
  })
  @Auth()
  @Patch(':id')
  async update() {}

  @ApiOperation({ summary: 'Delete team' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 204,
  })
  @Auth()
  @Delete(':id')
  async delete() {}

  @ApiOperation({ summary: 'Create logo for team' })
  @ApiBody({ type: CreateLogoRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 201,
    type: BaseLogoResponseDto,
  })
  @Auth()
  @Post(':id/logos')
  async createLogo() {}

  @ApiOperation({ summary: 'Find logo for team' })
  @ApiParam({
    name: 'identifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: { value: 'alabama-crimson-tide', description: 'Find by slug' },
    },
  })
  @ApiResponse({ status: 200, type: BaseLogoResponseDto })
  @Get(':identifier/logos')
  async findLogo() {}

  @ApiOperation({ summary: 'Update logo for team' })
  @ApiBody({ type: UpdateLogoRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseLogoResponseDto,
  })
  @Auth()
  @Patch(':id/logos')
  async updateLogo() {}

  @ApiOperation({ summary: 'Delete logo for team' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 204,
  })
  @Auth()
  @Delete(':id/logos')
  async deleteLogo() {}

  @ApiOperation({ summary: 'Assign stadium to team' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'stadiumId', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseTeamResponseDto,
  })
  @Auth()
  @Put(':id/stadiums/:stadiumId')
  async assignStadium() {}

  @ApiOperation({ summary: 'Unassign stadium from team' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: BaseTeamResponseDto })
  @Auth()
  @Delete(':id/stadiums')
  async unassignStadium() {}

  @ApiOperation({ summary: 'Create snapshot for team' })
  @ApiBody({ type: CreateSnapshotRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 201, type: BaseSnapshotResponseDto })
  @Auth()
  @Post(':id/snapshots')
  async createSnapshot() {}

  @ApiOperation({ summary: 'Find all snapshots for team' })
  @ApiParam({
    name: 'identifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: { value: 'alabama-crimson-tide', description: 'Find by slug' },
    },
  })
  @ApiResponse({ status: 200, type: BaseArraySnapshotResponseDto })
  @Get(':identifier/snapshots')
  async findAllSnapshots() {}

  @ApiOperation({ summary: 'Find snapshot for team' })
  @ApiParam({
    name: 'identifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: { value: 'alabama-crimson-tide', description: 'Find by slug' },
    },
  })
  @ApiParam({
    name: 'seasonIdentifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: { value: '2025-2026', description: 'Find by slug' },
    },
  })
  @ApiResponse({ status: 200, type: BaseSnapshotResponseDto })
  @Get(':identifier/snapshots/:seasonIdentifier')
  async findSnapshot() {}

  @ApiOperation({ summary: 'Update snapshot for team' })
  @ApiBody({ type: UpdateSnapshotRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'seasonId', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseSnapshotResponseDto,
  })
  @Auth()
  @Patch(':id/snapshots/:seasonId')
  async updateSnapshot() {}

  @ApiOperation({ summary: 'Delete snapshot for team' })
  @ApiParam({ name: 'id', type: Number })
  @ApiParam({ name: 'seasonId', type: Number })
  @ApiResponse({ status: 204 })
  @Auth()
  @Delete(':id/snapshots/seasonId')
  async deleteSnapshot() {}
}
