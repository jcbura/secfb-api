import { Auth } from '@/common/decorators';
import {
  BaseArrayConferenceRankingResponseDto,
  BaseArrayRankingResponseDto,
  ConferenceRankingResponseDto,
  RankingResponseDto,
  UpdateConferenceRankingsDto,
  UpdateRankingsDto,
} from '@/modules/rankings/dtos';
import { RankingsService } from '@/modules/rankings/rankings.service';
import { Body, Controller, Get, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Rankings')
@Controller('rankings')
export class RankingsController {
  constructor(private readonly rankingsService: RankingsService) {}

  @ApiOperation({ summary: 'Find current conference rankings' })
  @ApiOkResponse({ type: BaseArrayConferenceRankingResponseDto })
  @Get('conference')
  async findConferenceRankings(): Promise<ConferenceRankingResponseDto[]> {
    return this.rankingsService.findConferenceRankings();
  }

  @ApiOperation({ summary: 'Find current AP rankings' })
  @ApiOkResponse({ type: BaseArrayRankingResponseDto })
  @Get('ap')
  async findApRankings(): Promise<RankingResponseDto[]> {
    return this.rankingsService.findApRankings();
  }

  @ApiOperation({ summary: 'Find current CFP rankings' })
  @ApiOkResponse({ type: BaseArrayRankingResponseDto })
  @Get('cfp')
  async findCfpRankings(): Promise<RankingResponseDto[]> {
    return this.rankingsService.findCfpRankings();
  }

  @ApiOperation({ summary: 'Update current conference rankings' })
  @ApiOkResponse({ type: BaseArrayConferenceRankingResponseDto })
  @Auth()
  @Patch('conference')
  async updateConference(
    @Body() dto: UpdateConferenceRankingsDto,
  ): Promise<ConferenceRankingResponseDto[]> {
    return this.rankingsService.updateConferenceRankings(dto);
  }

  @ApiOperation({ summary: 'Update current AP rankings' })
  @ApiOkResponse({ type: BaseArrayRankingResponseDto })
  @Auth()
  @Patch('ap')
  async updateApRankings(
    @Body() dto: UpdateRankingsDto,
  ): Promise<RankingResponseDto[]> {
    return this.rankingsService.updateApRankings(dto);
  }

  @ApiOperation({ summary: 'Update current CFP rankings' })
  @ApiOkResponse({ type: BaseArrayRankingResponseDto })
  @Auth()
  @Patch('cfp')
  async updateCfpRankings(
    @Body() dto: UpdateRankingsDto,
  ): Promise<RankingResponseDto[]> {
    return this.rankingsService.updateCfpRankings(dto);
  }
}
