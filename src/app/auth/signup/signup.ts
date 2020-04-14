import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserDataService, UserLoginParams } from '../../providers/userData.service';
import { ModalController } from '@ionic/angular';
import { ConfirmCodeModalPage } from '../confirmCode/confirmCode';
import { TermsConditionsModalPage } from '../termsConditions/termsConditions';
import { ModalsService } from 'src/app/shared/modals.service';
import { environment } from '../../../environments/environment';
import { ConfigDataService } from 'src/app/providers/configData.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserLoginParams = {
    username: '',
    password: '',
    attributes: {
      name: '',
      family_name: '',
      picture: environment.defaultPicture,
      locale: ''
    }
  };
  configData: any;

  constructor(
    private configService: ConfigDataService,
    private userDataService: UserDataService,
    private modalController: ModalController,
    private modalService: ModalsService
  ) {
    this.configService.load().then(data => {
      this.configData = data;
      this.signup.attributes.locale = data.language;
    });
  }

  async onSignup(form: NgForm) {
    const loading = await this.modalService.createLoadController('auth.signingUp');

    try {
      await loading.present();
      await this.userDataService.signUp(this.signup);
      await loading.dismiss();

      const confirmed = await this.showConfirmCode();
      if (!confirmed) {
        // TODO: clean the user that was created.
      }
    } catch (error) {
      await loading.dismiss();
      await this.modalService.createCognitoErrorAlert(error);
    }
  }

  async openTermsConditions() {
    const modal = await this.modalController.create({
      component: TermsConditionsModalPage,
    });
    await modal.present();
  }

  async showConfirmCode(): Promise<boolean> {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: ConfirmCodeModalPage,
      componentProps: {
        user: this.signup
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data.confirmed;
  }
}
