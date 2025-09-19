import { LogosController } from '@/modules/logos/logos.controller';
import { LogosRepository } from '@/modules/logos/logos.repository';
import { LogosService } from '@/modules/logos/logos.service';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  controllers: [LogosController],
  providers: [LogosRepository, LogosService],
  exports: [LogosRepository],
})
export class LogosModule {}
