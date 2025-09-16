import 'dotenv/config';

type EnvironmentVariables = {
  PORT: number;
  ADDRESS: string;
  CORS_ORIGIN_REGEXP: RegExp;
  NODE_ENV: 'development' | 'production' | 'test';
  API_PREFIX: '/api';
};

const environmentVariables: EnvironmentVariables = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 3000,
  ADDRESS: process.env.ADDRESS ? process.env.ADDRESS : '0.0.0.0',
  CORS_ORIGIN_REGEXP: new RegExp(
    process.env.CORS_ORIGIN_REGEXP || '^http://localhost:\\d+$',
  ),
  NODE_ENV:
    (process.env.NODE_ENV as EnvironmentVariables['NODE_ENV']) || 'development',
  API_PREFIX: '/api',
};

export { environmentVariables };
