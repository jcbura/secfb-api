import { environmentVariables } from '@/config';
import { AuthController } from '@/modules/auth/auth.controller';
import { AuthService } from '@/modules/auth/auth.service';
import { JwtRefreshStrategy, LocalStrategy } from '@/modules/auth/strategies';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: environmentVariables.JWT_SECRET,
      signOptions: { expiresIn: environmentVariables.JWT_EXPIRES_IN },
    }),
    PassportModule,
  ],
  providers: [AuthService, LocalStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
