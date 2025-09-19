import { AuthModule } from '@/modules/auth/auth.module';
import { GamesModule } from '@/modules/games/games.module';
import { LogosModule } from '@/modules/logos/logos.module';
import { ParticipantsModule } from '@/modules/participants/participants.module';
import { PrismaModule } from '@/modules/prisma/prisma.module';
import { SeasonsModule } from '@/modules/seasons/seasons.module';
import { SnapshotsModule } from '@/modules/snapshots/snapshots.module';
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
    AuthModule,
    GamesModule,
    SeasonsModule,
    StadiumsModule,
    TeamsModule,
    PrismaModule,
    LogosModule,
    SnapshotsModule,
    ParticipantsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
