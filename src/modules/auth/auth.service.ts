import { encryption } from '@/common/utils';
import { environmentVariables } from '@/config';
import { AuthTokens, JwtPayload } from '@/modules/auth/interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async validateAdmin(
    username: string,
    password: string,
  ): Promise<JwtPayload | null> {
    const adminUsername = environmentVariables.ADMIN_USERNAME;

    if (username !== adminUsername) {
      return null;
    }

    const isMatch = await encryption.compareAdminPassword(password);
    if (!isMatch) {
      return null;
    }

    return {
      sub: 'admin',
      username: adminUsername,
      role: 'admin' as const,
    };
  }

  async login(user: JwtPayload): Promise<AuthTokens> {
    const payload = {
      sub: user.sub,
      username: user.username,
      role: user.role,
    };

    return this.generateAuthTokens(payload);
  }

  async refreshTokenAccess(user: JwtPayload): Promise<AuthTokens> {
    const payload = { sub: user.sub, username: user.username, role: user.role };

    return this.generateAuthTokens(payload);
  }

  async generateAuthTokens(payload: JwtPayload): Promise<AuthTokens> {
    const access_token = await this.jwtService.signAsync(payload);

    const refresh_token = await this.jwtService.signAsync(payload, {
      expiresIn: environmentVariables.JWT_REFRESH_EXPIRES_IN,
      secret: environmentVariables.JWT_REFRESH_SECRET,
    });

    return { access_token, refresh_token };
  }
}
