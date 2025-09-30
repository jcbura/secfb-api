import { CreateLogoDto } from '@/modules/teams/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdateLogoDto extends PartialType(CreateLogoDto) {}
