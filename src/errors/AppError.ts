import { HttpException, HttpStatus } from '@nestjs/common';

export class AppError extends HttpException {
  constructor( statusCode: HttpStatus = HttpStatus.BAD_REQUEST,message: string,) {
    super(
      {
        statusCode,
        success: false,
        message,
      },
      statusCode,
    );
  }
}
