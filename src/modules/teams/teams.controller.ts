import { Auth, Identifier } from '@/common/decorators';
import {
  CreatePerformanceDto,
  CreateTeamDto,
  UpdateLogoDto,
  UpdatePerformanceDto,
  UpdateTeamDto,
} from '@/modules/teams/dtos';
import { TeamsService } from '@/modules/teams/teams.service';
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

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Create team' })
  @Auth()
  @Post()
  async create(@Body() dto: CreateTeamDto) {
    return this.teamsService.create(dto);
  }

  @ApiOperation({ summary: 'Find teams' })
  @Get()
  async findMany() {
    return this.teamsService.findMany();
  }

  @ApiOperation({ summary: 'Find team' })
  @Identifier('alabama-crimson-tide')
  @Get(':identifier')
  async find(@Param('identifier') identifier: string) {
    return this.teamsService.find(identifier);
  }

  @ApiOperation({ summary: 'Update team' })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateTeamDto,
  ) {
    return this.teamsService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete team' })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Delete(':identifier')
  async delete(@Param('identifier') identifier: string) {
    return this.teamsService.delete(identifier);
  }

  @ApiOperation({ summary: 'Update logo' })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Patch(':identifier/logo')
  async updateLogo(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateLogoDto,
  ) {
    return this.teamsService.updateLogo(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete logo' })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Delete(':identifier/logo')
  async deleteLogo(@Param('identifier') identifier: string) {
    return this.teamsService.deleteLogo(identifier);
  }

  @ApiOperation({ summary: 'Create performance' })
  @Identifier('alabama-crimson-tide')
  @Identifier('2025-2026', 'seasonIdentifier')
  @Auth()
  @Post(':identifier/performance/:seasonIdentifier')
  async createPerformance(
    @Param('identifier') identifier: string,
    @Param('seasonIdentifier') seasonIdentifier: string,
    @Body() dto: CreatePerformanceDto,
  ) {
    return this.createPerformance(identifier, seasonIdentifier, dto);
  }

  @ApiOperation({ summary: 'Get performance' })
  @Identifier('alabama-crimson-tide')
  @Identifier('2025-2026', 'seasonIdentifier')
  @Get(':identifier/performance/:seasonIdentifier')
  async findPerformance(
    @Param('identifier') identifier: string,
    @Param('seasonIdentifier') seasonIdentifier: string,
  ) {
    return this.findPerformance(identifier, seasonIdentifier);
  }

  @ApiOperation({ summary: 'Update performance' })
  @Identifier('alabama-crimson-tide')
  @Identifier('2025-2026', 'seasonIdentifier')
  @Auth()
  @Patch(':identifier/performance/:seasonIdentifier')
  async updatePerformance(
    @Param('identifier') identifier: string,
    @Param('seasonIdentifier') seasonIdentifier: string,
    @Body() dto: UpdatePerformanceDto,
  ) {
    return this.updatePerformance(identifier, seasonIdentifier, dto);
  }

  @ApiOperation({ summary: 'Delete performance' })
  @Identifier('alabama-crimson-tide')
  @Identifier('2025-2026', 'seasonIdentifier')
  @Auth()
  @Delete(':identifier/performance/:seasonIdentifier')
  async deletePerformance(
    @Param('identifier') identifier: string,
    @Param('seasonIdentifier') seasonIdentifier: string,
  ) {
    return this.teamsService.deletePerformance(identifier, seasonIdentifier);
  }
}
