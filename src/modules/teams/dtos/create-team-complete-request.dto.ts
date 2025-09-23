import { CreateStadiumRequestDto } from '@/modules/stadiums/dtos';
import {
  CreateLogoRequestDto,
  CreateSnapshotRequestDto,
  CreateTeamRequestDto,
} from '@/modules/teams/dtos';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';

export class CreateTeamCompleteRequestDto {
  @ApiProperty({ type: () => CreateTeamRequestDto })
  @ValidateNested()
  @Type(() => CreateTeamRequestDto)
  team: CreateTeamRequestDto;

  @ApiPropertyOptional({ type: () => CreateLogoRequestDto })
  @ValidateNested()
  @Type(() => CreateLogoRequestDto)
  @IsOptional()
  logo?: CreateLogoRequestDto;

  @ApiPropertyOptional({ type: () => CreateSnapshotRequestDto })
  @ValidateNested()
  @Type(() => CreateSnapshotRequestDto)
  @IsOptional()
  snapshot?: CreateSnapshotRequestDto;

  @ApiPropertyOptional({ type: () => CreateStadiumRequestDto })
  @ValidateNested()
  @Type(() => CreateStadiumRequestDto)
  @IsOptional()
  stadium?: CreateStadiumRequestDto;
}
