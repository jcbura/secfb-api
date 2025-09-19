import { CreateLogoRequestDto } from '@/modules/logos/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateLogoRequestDto extends PartialType(CreateLogoRequestDto) {}
