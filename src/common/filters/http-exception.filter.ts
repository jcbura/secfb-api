import { ErrorResponseDto } from '@/common/dtos';
import { generateErrorResponse } from '@/common/utils';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const path = request.url;
    const statusCode = exception.getStatus();
    const message = exception.message;
    const cause = exception.cause;

    const responseBody: ErrorResponseDto<unknown> = generateErrorResponse(
      undefined,
      path,
      statusCode,
      message,
      cause,
    );

    response.status(statusCode).json(responseBody);
  }
}
