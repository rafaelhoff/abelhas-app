import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService, UserLoginParams } from '../../providers/userData.service';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordModalPage } from '../forgotPassword/forgotPassword';
import { ModalsService } from 'src/app/shared/modals.service';
import { ConfirmCodeModalPage } from '../confirmCode/confirmCode';


@Component({
  selector: 'pm-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  credentials: UserLoginParams = { username: '', password: '' };

  constructor(
    private modalController: ModalController,
    private modalService: ModalsService,
    public userDataService: UserDataService,
    public router: Router
  ) { }

  async onLogin(form: NgForm) {
    const loading = await this.modalService.createLoadController('auth.loggingIn');

    try {
      await loading.present();
      await this.userDataService.login(this.credentials);
      await loading.dismiss();

    } catch (error) {
      await loading.dismiss();
      if (error.code === 'UserNotConfirmedException') {
        this.showConfirmCode();
      } else {
        this.modalService.createCognitoErrorAlert(error);
      }
    }
  }

  onSignup() {
    this.router.navigateByUrl('/signup');
  }

  async forgotPassword(): Promise<boolean> {
    const modal = await this.modalController.create({
      component: ForgotPasswordModalPage
    });
    await modal.present();
    await modal.onWillDismiss();

    return true;
  }

  async showConfirmCode(): Promise<boolean> {
    const modal = await this.modalController.create({
      backdropDismiss: false,
      component: ConfirmCodeModalPage,
      componentProps: {
        user: this.credentials
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    return data.confirmed;
  }
}
