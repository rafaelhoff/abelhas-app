import { Injectable } from '@angular/core';
import { NGXLogger } from 'ngx-logger';

@Injectable({
    providedIn: 'root'
})
export class AppLogger {

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
    }
    error(message: any, ...additional: any[]): void {
        this.ngxLogger.error(message, ...additional);
        // console.error(message, ...additional);
    }
    // fatal(message: any, ...additional: any[]): void {
    //     this.ngxLogger.fatal(message, ...additional);
    //     console.fatal(message, ...additional);
    // }
}
