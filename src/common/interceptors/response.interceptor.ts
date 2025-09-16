import { SuccessResponseDto } from '@/common/dtos';
import { generateSuccessResponse } from '@/common/utils';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<SuccessResponseDto<unknown>> {
    return next
      .handle()
      .pipe(map((res: unknown) => this.responseHandler(res, context)));
  }

  responseHandler(
    res: any,
    context: ExecutionContext,
  ): SuccessResponseDto<unknown> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    const path = request.url;
    const statusCode = response.statusCode;

    const responseBody: SuccessResponseDto<unknown> = generateSuccessResponse(
      undefined,
      path,
      statusCode,
      undefined,
      res,
    );

    return responseBody;
  }
}
