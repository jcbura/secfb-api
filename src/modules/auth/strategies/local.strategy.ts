import { AuthService } from '@/modules/auth/auth.service';
import { JwtPayload } from '@/modules/auth/interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<JwtPayload> {
    const admin = await this.authService.validateAdmin(username, password);

    if (!admin) {
      throw new UnauthorizedException('Invalid admin credentials');
    }

    return admin;
  }
}
