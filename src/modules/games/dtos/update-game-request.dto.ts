import { CreateGameRequestDto } from '@/modules/games/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateGameRequestDto extends PartialType(CreateGameRequestDto) {}
