import { ConfigService } from '@nestjs/config';
import { CustomLoggerService } from '../custom-logger/custom-logger.service';
import { Request, Response, NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private customLoggerService: CustomLoggerService;

  constructor(private configService: ConfigService) {
    this.customLoggerService = new CustomLoggerService(this.configService);
    this.customLoggerService.setContext(LoggerMiddleware.name);
  }

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, body, params, originalUrl } = request;
    //const { statusCode } = response;
    let statusCode = 200;
    if (method === 'POST') statusCode = 201;
    if (method === 'DELETE') statusCode = 204;

    const log = `\nResponse Code: ${statusCode} - Method: ${method} - URL: ${originalUrl}
    Body - ${JSON.stringify(body)}
    Params: ${JSON.stringify(params)}
    `;
    this.customLoggerService.log(log, LoggerMiddleware.name);

    next();
  }
}
