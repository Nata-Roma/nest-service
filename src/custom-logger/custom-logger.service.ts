import { getLogLevels } from './../utils/getLogLevels';
import { Injectable, Scope, ConsoleLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';

@Injectable({ scope: Scope.TRANSIENT })
//@Injectable()
export class CustomLoggerService extends ConsoleLogger {
  private fileName: string = '';
  private fileSize: number;

  constructor(
    // options: ConsoleLoggerOptions,
    configService: ConfigService,
  ) {
    const environment = configService.get('NODE_ENV');
    // super(context, {
    //   ...options,
    // });
    super();
    this.setLogLevels(getLogLevels(environment === 'production'));
    this.fileSize = Number(configService.get('FILE_SIZE'));
  }

  log(message: string, context?: string) {
    super.log.apply(this, [`\n${message}`, context]);
    this.writeLogToFile(message, 'log', context);
  }

  error(message: string, context?: string) {
    super.error.apply(this, [`\n${message}`, context]);
    this.writeLogToFile(message, 'error', context);
  }

  warn(message: string, context?: string) {
    super.warn.apply(this, [`\n${message}`, context]);
    this.writeLogToFile(message, 'warn', context);
  }

  debug(message: string, context?: string) {
    super.debug.apply(this, [`\n${message}`, context]);
  }

  verbose(message: string, context?: string) {
    super.verbose.apply(this, [`\n${message}`, context]);
  }

  private writeLogToFile = (
    message: string,
    type: string,
    context?: string,
  ): void => {
    const amended = `\n${type.toUpperCase()} ${
      context
        ? '[' + context + ']'
        : this.context
        ? '[' + this.context + ']'
        : ''
    } ${message}`;

    if (!this.fileName) {
      this.createFileAndSave(amended, this.context);
    } else {
      this.amendFile(amended, this.context);
    }
  };

  createFileAndSave(message: string, context: string) {
    if (context) {
      this.fileName = `error_${context}_${Date.now()}.log`;
      fs.appendFile(this.fileName, `${message}`, 'utf8', (err) => {
        if (err) throw err;
      });
    }
  }

  amendFile(message: string, context: string) {
    fs.stat(this.fileName, (err, stat) => {
      if (err) {
        const message = `Fail to open file ${this.fileName}`;
        super.log.apply(this, [message, context]);
      } else {
        const fileSize = stat.size;

        if (fileSize > this.fileSize) {
          this.fileName = `error_${context}_${Date.now()}.log`;
        }
        fs.appendFile(this.fileName, `${message}`, 'utf8', (err) => {
          if (err) throw err;
        });
      }
    });
  }
}
