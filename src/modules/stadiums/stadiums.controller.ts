import { Auth, Identifier } from '@/common/decorators';
import { CreateStadiumDto, UpdateStadiumDto } from '@/modules/stadiums/dtos';
import { StadiumsService } from '@/modules/stadiums/stadiums.service';
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

@ApiTags('Stadiums')
@Controller('stadiums')
export class StadiumsController {
  constructor(private readonly stadiumsService: StadiumsService) {}

  @ApiOperation({ summary: 'Create stadium' })
  @Auth()
  @Post()
  async create(@Body() dto: CreateStadiumDto) {
    return this.stadiumsService.create(dto);
  }

  @ApiOperation({ summary: 'Find stadiums' })
  @Get()
  async findMany() {
    return this.stadiumsService.findMany();
  }

  @ApiOperation({ summary: 'Find stadium' })
  @Identifier('bryant-denny-stadium-tuscaloosa')
  @Get(':identifier')
  async find(@Param('identifier') identifier: string) {
    return this.stadiumsService.find(identifier);
  }

  @ApiOperation({ summary: 'Update stadium' })
  @Identifier('bryant-denny-stadium-tuscaloosa')
  @Auth()
  @Patch(':identifier')
  async update(
    @Param('identifier') identifier: string,
    @Body() dto: UpdateStadiumDto,
  ) {
    return this.stadiumsService.update(identifier, dto);
  }

  @ApiOperation({ summary: 'Delete stadium' })
  @Identifier('bryant-denny-stadium-tuscaloosa')
  @Auth()
  @Delete(':identifier')
  async delete(@Param('identifier') identifier: string) {
    return this.stadiumsService.delete(identifier);
  }
}
