import { Auth, Identifier } from '@/common/decorators';
import {
  BaseArrayTeamResponseDto,
  BaseLogoResponseDto,
  BaseTeamResponseDto,
  BulkCreateTeamDto,
  CreateTeamDto,
  LogoResponseDto,
  QueryTeamDto,
  TeamResponseDto,
  UpdateLogoDto,
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
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Teams')
@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @ApiOperation({ summary: 'Create team' })
  @ApiCreatedResponse({ type: BaseTeamResponseDto })
  @Auth()
  @Post()
  async create(@Body() dto: CreateTeamDto): Promise<TeamResponseDto> {
    return this.teamsService.create(dto);
  }

  @ApiOperation({ summary: 'Bulk create teams' })
  @ApiCreatedResponse({ type: BaseArrayTeamResponseDto })
  @Auth()
  @Post('bulk')
  async createMany(@Body() dto: BulkCreateTeamDto): Promise<TeamResponseDto[]> {
    return this.teamsService.createMany(dto);
  }

  @ApiOperation({ summary: 'Find teams' })
  @ApiOkResponse({ type: BaseArrayTeamResponseDto })
  @Get()
  async findMany(@Query() query: QueryTeamDto): Promise<TeamResponseDto[]> {
    return this.teamsService.findMany(query);
  }

  @ApiOperation({ summary: 'Find team' })
  @ApiOkResponse({ type: BaseTeamResponseDto })
  @Identifier('alabama-crimson-tide')
  @Get(':identifier')
  async find(
    @Param('identifier') identifier: string,
  ): Promise<TeamResponseDto> {
    return this.teamsService.find(identifier);
  }

  @ApiOperation({ summary: 'Update team' })
  @ApiOkResponse({ type: BaseTeamResponseDto })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateTeamDto,
  ): Promise<TeamResponseDto> {
    return this.teamsService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete team' })
  @ApiOkResponse({ type: BaseTeamResponseDto })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Delete(':identifier')
  async delete(
    @Param('identifier') identifier: string,
  ): Promise<TeamResponseDto> {
    return this.teamsService.delete(identifier);
  }

  @ApiOperation({ summary: 'Update logo' })
  @ApiOkResponse({ type: BaseLogoResponseDto })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Patch(':identifier/logo')
  async updateLogo(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateLogoDto,
  ): Promise<LogoResponseDto> {
    return this.teamsService.updateLogo(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete logo' })
  @ApiOkResponse({ type: BaseLogoResponseDto })
  @Identifier('alabama-crimson-tide')
  @Auth()
  @Delete(':identifier/logo')
  async deleteLogo(
    @Param('identifier') identifier: string,
  ): Promise<LogoResponseDto> {
    return this.teamsService.deleteLogo(identifier);
  }
}
