import { CreateStadiumRequestDto } from '@/modules/stadiums/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateStadiumRequestDto extends PartialType(
  CreateStadiumRequestDto,
) {}
