import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    console.log(exception.code, exception.message);

    switch (exception.code) {
      case '2002': {
        console.log('2002');
        const status = HttpStatus.FORBIDDEN;
        const message = 'Incorrect credentials';
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Record not found';
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default: {
        super.catch(exception, host);
        break;
      }
    }
  }
}
