import { environmentVariables } from '@/config';
import * as bcrypt from 'bcrypt';

const compareAdminPassword = (password: string): Promise<boolean> => {
  return bcrypt.compare(password, environmentVariables.ADMIN_PASSWORD_HASH);
};

export const encryption = { compareAdminPassword };
