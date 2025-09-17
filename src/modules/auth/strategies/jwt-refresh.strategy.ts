import { environmentVariables } from '@/config';
import { JwtPayload } from '@/modules/auth/interfaces';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

const extractFromCookie = (request: Request): string | null => {
  let token = null;

  if (request && request.cookies) {
    token = request.signedCookies[environmentVariables.COOKIE_NAME];
  }
  return token;
};

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([extractFromCookie]),
      ignoreExpiration: false,
      secretOrKey: environmentVariables.JWT_REFRESH_SECRET,
    });
  }

  async validate(payload: JwtPayload): Promise<JwtPayload> {
    return { sub: payload.sub, username: payload.username, role: payload.role };
  }
}
