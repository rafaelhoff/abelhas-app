import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ConfigService } from 'src/app/providers/config-data';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
})
export class ConfigurationPage implements OnInit {
  dark = false;
  data: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage,
    private configService: ConfigService) { }

  ngOnInit() {
    this.configService.load().subscribe((data: any) => this.data = data);
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  updateDarkMode() {
    this.configService.setDarkMode(this.dark);
  }
}
