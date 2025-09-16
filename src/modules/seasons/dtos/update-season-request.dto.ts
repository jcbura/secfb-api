import { CreateSeasonRequestDto } from '@/modules/seasons/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateSeasonRequestDto extends PartialType(
  CreateSeasonRequestDto,
) {}
