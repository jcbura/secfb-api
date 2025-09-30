import { CreatePerformanceDto } from '@/modules/teams/dtos';
import { PartialType } from '@nestjs/swagger';

export class UpdatePerformanceDto extends PartialType(CreatePerformanceDto) {}
