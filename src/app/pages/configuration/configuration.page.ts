import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { ConfigDataService, PresetConfigData } from 'src/app/providers/configData.service';
import { UserDataService, UserLoginParams } from 'src/app/providers/userData.service';
import { ModalsService } from 'src/app/shared/modals.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.page.html',
})
export class ConfigurationPage implements OnInit {
  preData: PresetConfigData;
  data: any;

  constructor(
    private menu: MenuController,
    private modalService: ModalsService,
    private router: Router,
    private configService: ConfigDataService,
    private userDataService: UserDataService) { }

  ngOnInit() {
    this.configService.loadPreData().subscribe((data: PresetConfigData) => this.preData = data);
    this.configService.load().then(data => this.data = data);
  }

  openTutorial() {
    // TODO: disable the login page on tutorial
    this.menu.enable(false);
    this.configService.setTutorialDone(false);
    this.router.navigateByUrl('/tutorial');
  }

  updateDarkMode() {
    this.configService.setDarkMode(this.data.darkMode);
  }

  async updateLanguage() {
    this.configService.setLanguage(this.data.language);

    try {
      const data: UserLoginParams = await this.userDataService.getUser();
      data.attributes.locale = this.data.language;
      this.userDataService.save(data);

    } catch (error) {
      this.modalService.createCognitoErrorAlert(error);

    }
  }
}
