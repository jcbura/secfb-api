import { Auth } from '@/common/decorators';
import {
  BaseArrayStadiumResponseDto,
  BaseStadiumResponseDto,
  CreateStadiumRequestDto,
  StadiumResponseDto,
  UpdateStadiumRequestDto,
} from '@/modules/stadiums/dtos';
import { StadiumsService } from '@/modules/stadiums/stadiums.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Stadiums')
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @ApiOperation({ summary: 'Create stadium' })
  @ApiBody({ type: CreateStadiumRequestDto })
  @ApiResponse({
    status: 201,
    type: BaseStadiumResponseDto,
  })
  @Auth()
  @Post()
  async create(
    @Body() dto: CreateStadiumRequestDto,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.create(dto);
  }

  @ApiOperation({ summary: 'Find all stadiums' })
  @ApiResponse({
    status: 200,
    type: BaseArrayStadiumResponseDto,
  })
  @Get()
  findAll(): Promise<StadiumResponseDto[]> {
    return this.stadiumsService.findAll();
  }

  @ApiOperation({ summary: 'Find stadium' })
  @ApiParam({
    name: 'identifier',
    type: String,
    examples: {
      id: { value: '1', description: 'Find by ID' },
      slug: {
        value: 'bryant-denny-stadium-tuscaloosa',
        description: 'Find by slug',
      },
    },
  })
  @ApiResponse({
    status: 200,
    type: BaseStadiumResponseDto,
  })
  @Get(':identifier')
  async find(
    @Param('identifier') identifier: string,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.findByIdentifier(identifier);
  }

  @ApiOperation({ summary: 'Update stadium' })
  @ApiBody({ type: UpdateStadiumRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    type: BaseStadiumResponseDto,
  })
  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateStadiumRequestDto,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Delete stadium' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 204,
  })
  @Auth()
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.stadiumsService.delete(id);
  }
}
