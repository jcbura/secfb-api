import { CreateSeasonDto } from '@/modules/seasons/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateSeasonDto extends PartialType(CreateSeasonDto) {}
