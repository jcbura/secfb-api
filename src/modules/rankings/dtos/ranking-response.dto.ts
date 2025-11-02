import { withBaseArrayResponse } from '@/common/utils';
import { ApiProperty } from '@nestjs/swagger';

class RankedTeamDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  slug: string;

  @ApiProperty()
  displayName: string;
}

export class RankingResponseDto {
  @ApiProperty()
  rank: number;

  @ApiProperty({ type: RankedTeamDto, nullable: true })
  team: RankedTeamDto | null;
}

export class ConferenceRankingResponseDto {
  @ApiProperty()
  rank: number;

  @ApiProperty({ type: RankedTeamDto })
  team: RankedTeamDto;
}

export class BaseArrayRankingResponseDto extends withBaseArrayResponse(
  RankingResponseDto,
) {}
export class BaseArrayConferenceRankingResponseDto extends withBaseArrayResponse(
  ConferenceRankingResponseDto,
) {}
