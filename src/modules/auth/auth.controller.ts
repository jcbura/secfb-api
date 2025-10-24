import { environmentVariables } from '@/config';
import { AuthService } from '@/modules/auth/auth.service';
import {
  BaseLoginResponseDto,
  BaseRefreshResponseDto,
  LoginRequestDto,
  LoginResponseDto,
} from '@/modules/auth/dtos';
import { JwtRefreshGuard, LocalAuthGuard } from '@/modules/auth/guards';
import { AuthenticatedRequest } from '@/modules/auth/interfaces';
import { Controller, Post, Request, Res, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login as admin' })
  @ApiBody({ type: LoginRequestDto })
  @ApiOkResponse({ type: BaseLoginResponseDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @Request() request: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const { access_token, refresh_token } = await this.authService.login(
      request.user,
    );

    this.saveRefreshCookie(response, refresh_token);
    return { access_token };
  }

  @ApiOperation({ summary: 'Refresh access token' })
  @ApiOkResponse({ type: BaseRefreshResponseDto })
  @UseGuards(JwtRefreshGuard)
  @Post('refresh')
  async refresh(
    @Request() request: AuthenticatedRequest,
    @Res({ passthrough: true }) response: Response,
  ): Promise<LoginResponseDto> {
    const { access_token, refresh_token } =
      await this.authService.refreshTokenAccess(request.user);

    this.saveRefreshCookie(response, refresh_token);
    return { access_token };
  }

  @ApiOperation({ summary: 'Logout as admin' })
  @ApiOkResponse({ description: 'Logged out as admin' })
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response): Promise<void> {
    this.clearRefreshCookie(response);
  }

  private saveRefreshCookie(
    response: Response,
    refreshToken: string,
  ): Response {
    return response
      .cookie(environmentVariables.COOKIE_NAME, refreshToken, {
        secure: !environmentVariables.TESTING,
        httpOnly: true,
        signed: true,
        sameSite: 'strict',
        path: environmentVariables.COOKIE_PATH,
        domain: environmentVariables.COOKIE_DOMAIN,
        expires: new Date(Date.now() + environmentVariables.COOKIE_LIFETIME),
      })
      .header('Content-Type', 'application/json');
  }

  private clearRefreshCookie(response: Response): Response {
    return response.clearCookie(environmentVariables.COOKIE_NAME, {
      path: environmentVariables.COOKIE_PATH,
      domain: environmentVariables.COOKIE_DOMAIN,
    });
  }
}
