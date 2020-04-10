import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserDataService, UserLoginParams } from '../../providers/userData.service';
import { ModalController } from '@ionic/angular';
import { ForgotPasswordModalPage } from '../forgotPassword/forgotPassword';
import { ModalsService } from 'src/app/shared/modals.service';


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

    try {
      await this.userDataService.login(this.credentials);
    } catch (error) {
      this.modalService.createCognitoErrorAlert(error);
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
}
