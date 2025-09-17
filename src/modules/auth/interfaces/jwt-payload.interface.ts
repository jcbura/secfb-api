export interface JwtPayload {
  sub: string;
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}
