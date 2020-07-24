import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { API, graphqlOperation } from 'aws-amplify';
import { createLogger } from 'src/graphql/mutations';
import { LoggerLevel } from 'src/API';

@Injectable({
  providedIn: 'root'
})
export class AppLogger {

  // TODO: how to support the upload of data to CloudWatch logs?
  // Open Issue: https://github.com/aws-amplify/amplify-js/issues/3524

  constructor(private ngxLogger: NGXLogger) {

  }

  trace(message: any, ...additional: any[]): void {
    this.ngxLogger.trace(message, ...additional);
    // console.trace(message, ...additional);
  }
  debug(message: any, ...additional: any[]): void {
    this.ngxLogger.debug(message, ...additional);
    // console.debug(message, ...additional);
  }
  info(message: any, ...additional: any[]): void {
    this.ngxLogger.info(message, ...additional);
    // console.info(message, ...additional);
  }
  log(message: any, ...additional: any[]): void {
    this.ngxLogger.log(message, ...additional);
    // console.log(message, ...additional);
  }
  warn(message: any, ...additional: any[]): void {
    this.ngxLogger.warn(message, ...additional);
    // console.warn(message, ...additional);

    API.graphql(graphqlOperation(createLogger, {
      input: { level: LoggerLevel.warn, message, stack: additional }
    }));
  }
  error(message: any, ...additional: any[]): void {
    this.ngxLogger.error(message, ...additional);
    // console.error(message, ...additional);

    API.graphql(graphqlOperation(createLogger, {
      input: { level: LoggerLevel.error, message, stack: additional }
    }));
  }
  // fatal(message: any, ...additional: any[]): void {
  //     this.ngxLogger.fatal(message, ...additional);
  //     console.fatal(message, ...additional);
  // }
}
