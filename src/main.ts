import { CustomLoggerService } from './custom-logger/custom-logger.service';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { resolve } from 'path';
import { cwd } from 'process';
import { parse } from 'yaml';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const configService = app.get(ConfigService);
  app.useLogger(new CustomLoggerService(configService));

  const customLoggerService = new CustomLoggerService(configService);
  customLoggerService.setContext(bootstrap.name);
  
  process.on('uncaughtException', (err: Error) => {
    const errorLog = `Uncaught Exception occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;
    customLoggerService.warn(errorLog, bootstrap.name);
  });
  process.on('unhandledRejection', (err: Error) => {
    const errorLog = `Unhandled Rejection occurred at: ${JSON.stringify(
      err.stack || err,
    )}`;
    customLoggerService.warn(errorLog, bootstrap.name);
  });

  const PORT = configService.get<string>('PORT') || 4000;
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const DOC_API = await readFile(resolve(cwd(), 'doc', 'api.yaml'), 'utf-8');
  const document = parse(DOC_API);

  SwaggerModule.setup('doc', app, document);

  await app.listen(PORT);
}
bootstrap();
