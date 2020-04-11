import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { ConfigService } from './config-data';
import { UserDataService } from './userData.service';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoggedInService implements CanLoad {
  constructor(
    private menu: MenuController,
    private userService: UserDataService,
    private router: Router
  ) { }

  async canLoad(): Promise<boolean> {
    const loggedIn: boolean = await this.userService.isLoggedIn();
    if (!loggedIn) {
      this.router.navigate(['/login']);
      this.menu.enable(false);
    } else {
      this.menu.enable(true);
    }

    return loggedIn;
  }
}
