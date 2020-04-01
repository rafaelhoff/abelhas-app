import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';

import { Platform, ToastController } from '@ionic/angular';

import { UserDataService } from './providers/user-data';
import { SplashScreen } from '@capacitor/core';
import { ConfigService } from './providers/config-data';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Schedule',
      url: '/app/tabs/schedule',
      icon: 'calendar'
    },
    {
      title: 'Speakers',
      url: '/app/tabs/speakers',
      icon: 'people'
    },
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    }
  ];
  loggedIn = false;
  dark = false;

  constructor(
    private logger: NGXLogger,
    private platform: Platform,
    private router: Router,
    private userDataService: UserDataService,
    private swUpdate: SwUpdate,
    private toastCtrl: ToastController,
    private configService: ConfigService
  ) {
    this.initializeApp();
  }

  async ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();

    this.swUpdate.available.subscribe(async res => {
      const toast = await this.toastCtrl.create({
        message: 'Update available!',
        position: 'bottom',
        buttons: [
          {
            role: 'cancel',
            text: 'Reload'
          }
        ]
      });

      await toast.present();

      toast
        .onDidDismiss()
        .then(() => this.swUpdate.activateUpdate())
        .then(() => window.location.reload());
    });
  }

  async initializeApp() {
    await this.platform.ready();
    await this.configService.load();

    this.configService.darkMode$.subscribe((dM: boolean) => {
      this.logger.debug('got darkmode changed');
      return this.dark = dM;
    });

    SplashScreen.hide();

  }

  checkLoginStatus() {
    return this.userDataService.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    window.addEventListener('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    window.addEventListener('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  logout() {
    this.userDataService.logout().then(() => {
      return this.router.navigateByUrl('/app/tabs/schedule');
    });
  }

}
