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
  preData: any;
  data: any;

  constructor(
    private menu: MenuController,
    private router: Router,
    private storage: Storage,
    private configService: ConfigService) { }

  ngOnInit() {
    this.configService.loadPreData().subscribe((data: any) => this.preData = data);
    this.configService.load().then(data => this.data = data);
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', false);
    this.router.navigateByUrl('/tutorial');
  }

  updateDarkMode() {
    this.configService.setDarkMode(this.data.darkMode);
  }

  updateLanguage() {
    this.configService.setLanguage(this.data.language);
  }
}
