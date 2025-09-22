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
  @ApiProperty({ type: CreateTeamRequestDto })
  @ValidateNested()
  @Type(() => CreateTeamRequestDto)
  team: Omit<CreateTeamRequestDto, 'stadiumId'>;

  @ApiPropertyOptional({ type: CreateLogoRequestDto })
  @ValidateNested()
  @Type(() => CreateLogoRequestDto)
  @IsOptional()
  logo?: Omit<CreateLogoRequestDto, 'teamId'>;

  @ApiPropertyOptional({ type: CreateSnapshotRequestDto })
  @ValidateNested()
  @Type(() => CreateSnapshotRequestDto)
  @IsOptional()
  snapshot?: Omit<CreateSnapshotRequestDto, 'teamId' | 'seasonId'>;

  @ApiPropertyOptional({ type: CreateStadiumRequestDto })
  @ValidateNested()
  @Type(() => CreateStadiumRequestDto)
  @IsOptional()
  stadium?: CreateStadiumRequestDto;
}
