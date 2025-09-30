import { CreateGameDto } from '@/modules/games/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateGameDto extends PartialType(CreateGameDto) {}
