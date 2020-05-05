import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ConfigDataService } from './configData.service';
import { MenuController } from '@ionic/angular';
import { AppLogger } from '../util/appLogger';

@Injectable({
  providedIn: 'root'
})
export class CheckTutorialService implements CanLoad, CanActivate {
  constructor(
    private configService: ConfigDataService,
    private logger: AppLogger,
    private menu: MenuController,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.validate();
  }

  canLoad(): Promise<boolean> {
    return this.validate();
  }

  private async validate(): Promise<boolean> {
    const tutorialDone = await this.configService.isTutorialDone();
    this.logger.debug('CheckTutorialService => tutorialDone:', tutorialDone);
    if (tutorialDone) {
      this.router.navigate(['/']);
      return false;
    } else {
      this.menu.enable(false);
      return true;
    }
  }

}
