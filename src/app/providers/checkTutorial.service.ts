import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { ConfigDataService } from './configData.service';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorialService implements CanLoad {
  constructor(
    private configService: ConfigDataService,
    private menu: MenuController,
    private router: Router
  ) { }

  canLoad() {
    return this.configService.isTutorialDone().then(res => {
      if (res) {
        this.router.navigate(['/']);
        return false;
      } else {
        this.menu.enable(false);
        return true;
      }
    });
  }
}
