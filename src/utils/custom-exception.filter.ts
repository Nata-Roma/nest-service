import { CustomLoggerService } from './../custom-logger/custom-logger.service';
import { ExceptionResponse } from './custom-exception.interface';
import {
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Prisma } from '@prisma/client';
import { Request, Response } from 'express';
import * as fs from 'fs';

@Catch()
export class CustomExceptionFilter extends BaseExceptionFilter {
  constructor(private customLoggerService: CustomLoggerService) {
    super();
    this.customLoggerService.setContext(CustomExceptionFilter.name);
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    if (exception instanceof HttpException) {
      this.httpErrorHandler(exception, request, response);
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      this.prismaErrorsHandler(exception, request, response, host);
    } else {
      const status = HttpStatus.INTERNAL_SERVER_ERROR as number;
      const resp = {
        statusCode: status,
        message: 'Critical internal server error occurred!',
      };
      const errorLog = this.getErrorLog(resp, request);
      this.customLoggerService.error(errorLog, CustomExceptionFilter.name);
      response.status(status).json(resp);
    }
  }

  private httpErrorHandler(
    exception: HttpException,
    request: Request,
    response: Response,
  ) {
    const status = exception.getStatus();
    const message = exception.getResponse();

    const resp = {
      statusCode: status,
      message: message['message'],
    };

    const errorLog = this.getErrorLog(resp, request);
    this.customLoggerService.error(errorLog, CustomExceptionFilter.name);
    response.status(status).json(resp);
  }

  private prismaErrorsHandler(
    exception: Prisma.PrismaClientKnownRequestError,
    request: Request,
    response: Response,
    host: ArgumentsHost,
  ) {
    switch (exception.code) {
      case 'P2002': {
        const status = HttpStatus.FORBIDDEN;
        const message = 'Incorrect credentials';

        const resp = {
          statusCode: status,
          message: message,
        };

        const errorLog = this.getErrorLog(resp, request);
        this.customLoggerService.error(errorLog, CustomExceptionFilter.name);
        response.status(status).json(resp);
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;

        const message = (
          exception.meta['cause'] ? exception.meta['cause'] : 'Record not found'
        ) as string;

        const resp = {
          statusCode: status,
          message: message,
        };

        const errorLog = this.getErrorLog(resp, request);
        this.customLoggerService.error(errorLog, CustomExceptionFilter.name);
        response.status(status).json(resp);
        break;
      }
      default: {
        
        const resp = {
          statusCode: 500,
          message: 'Prisma Error',
        };
        const errorLog = this.getErrorLog(resp, request);
        this.customLoggerService.error(errorLog, CustomExceptionFilter.name);
        super.catch(exception, host);
        break;
      }
    }
  }

  private getErrorLog(errorResponse: ExceptionResponse, request: Request) {
    const { statusCode, message } = errorResponse;
    const { method, url } = request;

    const errorLog = `\nResponse Code: ${statusCode} - Method: ${method} - URL: ${url}
    Body - ${JSON.stringify(request.body)}
    ${JSON.stringify(errorResponse)}
    `;

    return errorLog;
  }
}
