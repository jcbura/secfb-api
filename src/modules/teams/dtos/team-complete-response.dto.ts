import { withBaseResponse } from '@/common/utils';
import { StadiumResponseDto } from '@/modules/stadiums/dtos';
import {
  LogoResponseDto,
  SnapshotResponseDto,
  TeamResponseDto,
} from '@/modules/teams/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class TeamCompleteResponseDto {
  @ApiProperty({ type: () => TeamResponseDto })
  team: TeamResponseDto;

  @ApiPropertyOptional({ type: () => LogoResponseDto })
  logo?: LogoResponseDto;

  @ApiPropertyOptional({ type: () => SnapshotResponseDto })
  snapshot?: SnapshotResponseDto;

  @ApiPropertyOptional({ type: () => StadiumResponseDto })
  stadium?: StadiumResponseDto;
}

export class BaseTeamCompleteResponseDto extends withBaseResponse(
  TeamCompleteResponseDto,
) {}
