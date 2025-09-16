import { ErrorResponseDto } from '@/common/dtos';
import { generateErrorResponse } from '@/common/utils';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(
    exception: Prisma.PrismaClientKnownRequestError,
    host: ArgumentsHost,
  ): void {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const path = request.url;
    let statusCode = HttpStatus.BAD_REQUEST;
    let message = exception.message.split('\n').pop();

    switch (exception.code) {
      case 'P2000': {
        message = 'Input data is too long or invalid format';
        statusCode = HttpStatus.BAD_REQUEST;
        break;
      }
      case 'P2002': {
        const target = exception.meta?.target as string[];
        message = `${target?.[0] || 'Field'} already exists`;
        statusCode = HttpStatus.CONFLICT;
        break;
      }
      case 'P2003': {
        const fieldName = (exception.meta?.field_name as string)?.split('_')[1];
        message = `Invalid reference to ${fieldName || 'related record'}`;
        statusCode = HttpStatus.CONFLICT;
        break;
      }
      case 'P2025': {
        message = 'Record not found';
        statusCode = HttpStatus.NOT_FOUND;
        break;
      }
      default: {
        message = 'Database operation failed';
        statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        break;
      }
    }

    const responseBody: ErrorResponseDto<unknown> = generateErrorResponse(
      undefined,
      path,
      statusCode,
      message,
    );

    response.status(statusCode).json(responseBody);
  }
}
