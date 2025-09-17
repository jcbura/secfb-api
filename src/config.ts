import 'dotenv/config';
import { TIME } from '@/common/utils';
import * as Joi from 'joi';

const envSchema = Joi.object({
  DATABASE_URL: Joi.string().default(
    'postgresql://postgres:postgres@localhost:5432/secfb_db',
  ),

  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  PORT: Joi.number().port().default(3000),
  ADDRESS: Joi.string().ip().default('0.0.0.0'),

  CORS_ORIGIN_REGEXP: Joi.string().default('^http://localhost:\\d+$'),

  COOKIE_SECRET: Joi.string().min(32).required(),
  COOKIE_NAME: Joi.string().default('SECFB_REFRESH_TOKEN'),
  COOKIE_PATH: Joi.string().default('/'),
  COOKIE_DOMAIN: Joi.string().default('localhost'),
  COOKIE_LIFETIME: Joi.number()
    .positive()
    .default(TIME.DAY * 7),

  JWT_SECRET: Joi.string().min(32).required(),
  JWT_EXPIRES_IN: Joi.string().default('15m'),
  JWT_REFRESH_SECRET: Joi.string().min(32).required(),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default('7d'),

  SALT_ROUNDS: Joi.number().integer().min(10).max(15).default(12),

  ADMIN_USERNAME: Joi.string().min(3).required(),
  ADMIN_PASSWORD_HASH: Joi.string().required(),
}).unknown();

const { value: validatedEnv } = envSchema.validate(process.env, {
  abortEarly: false,
});

type EnvironmentVariables = {
  DATABASE_URL: string;
  PORT: number;
  ADDRESS: string;
  CORS_ORIGIN_REGEXP: RegExp;
  TESTING: boolean;
  COOKIE_SECRET: string;
  COOKIE_NAME: string;
  COOKIE_PATH: string;
  COOKIE_DOMAIN: string;
  COOKIE_LIFETIME: number;
  NODE_ENV: 'development' | 'production' | 'test';
  API_PREFIX: '/api';
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES_IN: string;
  SALT_ROUNDS: number;
  ADMIN_USERNAME: string;
  ADMIN_PASSWORD_HASH: string;
};

const environmentVariables: EnvironmentVariables = {
  DATABASE_URL: validatedEnv.DATABASE_URL,
  PORT: validatedEnv.PORT,
  ADDRESS: validatedEnv.ADDRESS,
  CORS_ORIGIN_REGEXP: new RegExp(validatedEnv.CORS_ORIGIN_REGEXP as string),
  TESTING: validatedEnv.NODE_ENV !== 'production',
  COOKIE_SECRET: validatedEnv.COOKIE_SECRET,
  COOKIE_NAME: validatedEnv.COOKIE_NAME,
  COOKIE_PATH: validatedEnv.COOKIE_PATH,
  COOKIE_DOMAIN: validatedEnv.COOKIE_DOMAIN,
  COOKIE_LIFETIME: validatedEnv.COOKIE_LIFETIME,
  NODE_ENV: validatedEnv.NODE_ENV,
  API_PREFIX: '/api',
  JWT_SECRET: validatedEnv.JWT_SECRET,
  JWT_EXPIRES_IN: validatedEnv.JWT_EXPIRES_IN,
  JWT_REFRESH_SECRET: validatedEnv.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRES_IN: validatedEnv.JWT_REFRESH_EXPIRES_IN,
  SALT_ROUNDS: validatedEnv.SALT_ROUNDS,
  ADMIN_USERNAME: validatedEnv.ADMIN_USERNAME,
  ADMIN_PASSWORD_HASH: validatedEnv.ADMIN_PASSWORD_HASH,
};

export { environmentVariables };
