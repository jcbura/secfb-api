import { Auth } from '@/common/decorators';
import { withBaseArrayResponse, withBaseResponse } from '@/common/utils';
import {
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
    description: 'Created stadium successfully',
    type: class CreateStadiumResponseDto extends withBaseResponse(
      StadiumResponseDto,
    ) {},
  })
  @Auth()
  @Post()
  async create(
    @Body() createStadiumRequestDto: CreateStadiumRequestDto,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.create(createStadiumRequestDto);
  }

  @ApiOperation({ summary: 'Find all stadiums' })
  @ApiResponse({
    status: 200,
    description: 'Found all stadiums successfully',
    type: class FindAllStadiumsResponseDto extends withBaseArrayResponse(
      StadiumResponseDto,
    ) {},
  })
  @Get()
  findAll(): Promise<StadiumResponseDto[]> {
    return this.stadiumsService.findAll();
  }

  @ApiOperation({ summary: 'Find stadium by ID or slug' })
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
    description: 'Found stadium by ID or slug successfully',
    type: class FindStadiumResponseDto extends withBaseResponse(
      StadiumResponseDto,
    ) {},
  })
  @Get(':identifier')
  async findByIdentifier(
    @Param('identifier') identifier: string,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.findByIdentifier(identifier);
  }

  @ApiOperation({ summary: 'Update stadium by ID' })
  @ApiBody({ type: UpdateStadiumRequestDto })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Updated stadium by ID successfully',
    type: class UpdateStadiumResponseDto extends withBaseResponse(
      StadiumResponseDto,
    ) {},
  })
  @Auth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStadiumRequestDto: UpdateStadiumRequestDto,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.update(id, updateStadiumRequestDto);
  }

  @ApiOperation({ summary: 'Soft delete stadium by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Soft deleted stadium by ID successfully',
    type: class SoftDeletedStadiumResponseDto extends withBaseResponse(
      StadiumResponseDto,
    ) {},
  })
  @Auth()
  @Delete(':id')
  softDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.softDelete(id);
  }

  @ApiOperation({ summary: 'Restore soft-deleted stadium by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Restored soft-deleted stadium by ID successfully',
    type: class RestoreStadiumResponseDto extends withBaseResponse(
      StadiumResponseDto,
    ) {},
  })
  @Auth()
  @Patch(':id/restore')
  restore(@Param('id', ParseIntPipe) id: number): Promise<StadiumResponseDto> {
    return this.stadiumsService.restore(id);
  }

  @ApiOperation({ summary: 'Hard delete stadium by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Hard deleted stadium by ID successfully',
    type: class HardDeletedStadiumResponseDto extends withBaseResponse(
      StadiumResponseDto,
    ) {},
  })
  @Auth()
  @Delete(':id/hard')
  hardDelete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<StadiumResponseDto> {
    return this.stadiumsService.hardDelete(id);
  }
}
