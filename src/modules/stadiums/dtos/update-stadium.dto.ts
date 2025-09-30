import { CreateStadiumDto } from '@/modules/stadiums/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateStadiumDto extends PartialType(CreateStadiumDto) {}
