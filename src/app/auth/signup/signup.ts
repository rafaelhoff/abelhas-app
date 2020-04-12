import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserDataService, UserLoginParams } from '../../providers/userData.service';
import { ModalController } from '@ionic/angular';
import { ConfirmCodeModalPage } from '../confirmCode/confirmCode';
import { TermsConditionsModalPage } from '../termsConditions/termsConditions';
import { ModalsService } from 'src/app/shared/modals.service';
import { environment } from '../../../environments/environment';

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
      picture: environment.defaultPicture
    }
  };

  constructor(
    public userDataService: UserDataService,
    private modalController: ModalController,
    private modalService: ModalsService
  ) { }

  async onSignup(form: NgForm) {

    try {
      await this.userDataService.signup(this.signup);
      const confirmed = await this.showConfirmCode();
      if (!confirmed) {
        // TODO: clean the user that was created.
      }
    } catch (error) {
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
