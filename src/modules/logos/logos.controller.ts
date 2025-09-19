import { LogosService } from '@/modules/logos/logos.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Logos')
@Controller('logos')
export class LogosController {
  constructor(private readonly logosService: LogosService) {}
}
