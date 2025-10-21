import { Auth, Identifier } from '@/common/decorators';
import {
  BaseArrayStadiumResponseDto,
  BaseStadiumResponseDto,
  BulkCreateStadiumDto,
  CreateStadiumDto,
  QueryStadiumDto,
  StadiumResponseDto,
  UpdateStadiumDto,
} from '@/modules/stadiums/dtos';
import { StadiumsService } from '@/modules/stadiums/stadiums.service';
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

@ApiTags('Stadiums')
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @ApiOperation({ summary: 'Create stadium' })
  @ApiCreatedResponse({ type: BaseStadiumResponseDto })
  @Auth()
  @Post()
  async create(@Body() dto: CreateStadiumDto): Promise<StadiumResponseDto> {
    return this.stadiumsService.create(dto);
  }

  @ApiOperation({ summary: 'Bulk create stadiums' })
  @ApiCreatedResponse({ type: BaseArrayStadiumResponseDto })
  @Auth()
  @Post('bulk')
  async createMany(
    @Body() dto: BulkCreateStadiumDto,
  ): Promise<StadiumResponseDto[]> {
    return this.stadiumsService.createMany(dto);
  }

  @ApiOperation({ summary: 'Find stadiums' })
  @ApiOkResponse({ type: BaseArrayStadiumResponseDto })
  @Get()
  async findMany(
    @Query() query: QueryStadiumDto,
  ): Promise<StadiumResponseDto[]> {
    return this.stadiumsService.findMany(query);
  }

  @ApiOperation({ summary: 'Find stadium' })
  @ApiOkResponse({ type: BaseStadiumResponseDto })
  @Identifier('bryant-denny-stadium-tuscaloosa')
  @Get(':identifier')
  async find(
    @Param('identifier') identifier: string,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.find(identifier);
  }

  @ApiOperation({ summary: 'Update stadium' })
  @ApiOkResponse({ type: BaseStadiumResponseDto })
  @Identifier('bryant-denny-stadium-tuscaloosa')
  @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateStadiumDto,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete stadium' })
  @ApiOkResponse({ type: BaseStadiumResponseDto })
  @Identifier('bryant-denny-stadium-tuscaloosa')
  @Auth()
  @Delete(':identifier')
  async delete(
    @Param('identifier') identifier: string,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.delete(identifier);
  }
}
