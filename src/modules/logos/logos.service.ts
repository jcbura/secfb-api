import { LogosRepository } from '@/modules/logos/logos.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LogosService {
  constructor(private readonly logosRepository: LogosRepository) {}
}
