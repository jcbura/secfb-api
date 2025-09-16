import { GamesModule } from '@/modules/games/games.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SeasonsModule } from '@/modules/seasons/seasons.module';
import { StadiumsModule } from '@/modules/stadiums/stadiums.module';
import { TeamsModule } from '@/modules/teams/teams.module';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
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
    PrismaModule,
    TeamsModule,
    GamesModule,
    SeasonsModule,
    StadiumsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
