import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { ConfigService } from './config-data';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorial implements CanLoad {
  constructor(private configService: ConfigService, private router: Router) { }

  canLoad() {
    return this.configService.isTutorialDone().then(res => {
      if (res) {
        this.router.navigate(['/app', 'tabs', 'schedule']);
        return false;
      } else {
        return true;
      }
    });
  }
}
