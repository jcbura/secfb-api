import { AuthModule } from '@/modules/auth/auth.module';
import { GamesModule } from '@/modules/games/games.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { SeasonsModule } from '@/modules/seasons/seasons.module';
import { StadiumsModule } from '@/modules/stadiums/stadiums.module';
import { TeamsModule } from '@/modules/teams/teams.module';
import { ClsPluginTransactional } from '@nestjs-cls/transactional';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ClsModule } from 'nestjs-cls';

@Module({
  imports: [
    ClsModule.forRoot({
      plugins: [
        new ClsPluginTransactional({
          imports: [PrismaModule],
          adapter: new TransactionalAdapterPrisma({
            prismaInjectionToken: PrismaService,
          }),
        }),
      ],
    }),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'short',
          ttl: 1000,
          limit: 3,
        },
        {
          name: 'medium',
          ttl: 10000,
          limit: 20,
        },
        {
          name: 'long',
          ttl: 60000,
          limit: 100,
        },
      ],
    }),
    AuthModule,
    PrismaModule,
    GamesModule,
    SeasonsModule,
    StadiumsModule,
    TeamsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
