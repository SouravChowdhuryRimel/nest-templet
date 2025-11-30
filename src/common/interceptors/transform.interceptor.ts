import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data: any) => {
        return {
           statusCode: data?.statusCode ?? response.statusCode,
          success: true,
          message: data?.message ?? 'Request successful',
          data: data?.data ?? data,
        };
      })
    );
  }
}
