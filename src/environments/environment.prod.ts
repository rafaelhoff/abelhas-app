import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: true,
  connectToCognito: true,
  connectToS3: true,
  defaultPicture: '/assets/img/profile.png',
  showTestMenu: false,
  loggerLevel: NgxLoggerLevel.ERROR
};
