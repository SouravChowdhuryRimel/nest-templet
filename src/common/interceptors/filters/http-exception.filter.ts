import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let message =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';

    let errorMessage: string;

    if (typeof message === 'string') {
      errorMessage = message;
    } else if (typeof message === 'object' && message !== null) {
      errorMessage =
        (message as any).message || (message as any).error || 'Error occurred';
    } else {
      errorMessage = 'Unexpected error';
    }

    response.status(status).json({
      statusCode: status,
      success: false,
      message: errorMessage,
      error:
        exception instanceof HttpException ? exception.name : 'InternalServerError',
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
