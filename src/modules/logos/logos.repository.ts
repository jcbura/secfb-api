import { BaseRepository } from '@/common/repositories';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Logo, Prisma } from '@prisma/client';

@Injectable()
export class LogosRepository extends BaseRepository<
  Logo,
  Prisma.LogoCreateInput,
  Prisma.LogoUpdateInput
> {
  constructor(prismaService: PrismaService) {
    super(prismaService, 'Logo');
  }
}
