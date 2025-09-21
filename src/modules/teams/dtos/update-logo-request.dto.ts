import { CreateLogoRequestDto } from '@/modules/teams/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateLogoRequestDto extends PartialType(CreateLogoRequestDto) {}
