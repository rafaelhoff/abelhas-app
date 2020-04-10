import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService, UserLoginParams } from '../../providers/userData.service';
import { ModalController } from '@ionic/angular';
import { ConfirmCodeModalPage } from '../confirmCode/confirmCode';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  styleUrls: ['./signup.scss'],
})
export class SignupPage {
  signup: UserLoginParams = { username: '', password: '' };

  // TODO: clean on opening the page...
  constructor(
    public router: Router,
    public userDataService: UserDataService,
    private modalController: ModalController
  ) { }

  async onSignup(form: NgForm) {

    try {
      await this.userDataService.signup(this.signup);
      const confirmed = await this.showConfirmCode();
      if (confirmed) {
        this.router.navigateByUrl('/app/tabs/schedule');
      }
    } catch (error) {
      // TODO: fix the error
      console.log(error);
    }
  }

  openTermsConditions() {
    // TODO: fix the terms and conditions
    console.log('opened');
  }

  async showConfirmCode(): Promise<boolean> {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: ConfirmCodeModalPage,
      componentProps: {
        username: this.signup.username
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data.confirmed;
  }
}
