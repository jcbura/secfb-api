import { AppModule } from '@/app.module';
import { BaseResponseDto } from '@/common/dtos';
import {
  HttpExceptionFilter,
  PrismaClientExceptionFilter,
} from '@/common/filters';
import { ResponseInterceptor } from '@/common/interceptors';
import { environmentVariables } from '@/config';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(environmentVariables.API_PREFIX);

  app.use(cookieParser(environmentVariables.COOKIE_SECRET));

  app.enableCors({
    credentials: true,
    origin: environmentVariables.CORS_ORIGIN_REGEXP,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });

  app.useGlobalFilters(
    new HttpExceptionFilter(),
    new PrismaClientExceptionFilter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: false,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());

  const config = new DocumentBuilder()
    .setTitle('SECFB API')
    .setDescription('SECFB API Documentation')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, config, {
      extraModels: [BaseResponseDto],
    });
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(environmentVariables.PORT, environmentVariables.ADDRESS);
}
void bootstrap();
