import { JwtPayload } from '@/modules/auth/interfaces';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: JwtPayload;
}
