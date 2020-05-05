import { Injectable } from '@angular/core';
import { CanLoad, Router, CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { UserDataService } from './userData.service';
import { MenuController } from '@ionic/angular';
import { AppLogger } from '../util/appLogger';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService implements CanLoad, CanActivate {
  constructor(
    private logger: AppLogger,
    private menu: MenuController,
    private userService: UserDataService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.validate();
  }

  canLoad(): Promise<boolean> {
    return this.validate();
  }

  private async validate(): Promise<boolean> {
    const loggedIn = await this.userService.isLoggedIn();
    this.logger.debug('LoggedInService => loggedIn:', loggedIn);
    if (!loggedIn) {
      this.router.navigate(['/login']);
      this.menu.enable(false);
    } else {
      this.menu.enable(true);
    }
    return loggedIn;
  }
}
