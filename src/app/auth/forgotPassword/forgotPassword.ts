import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserDataService } from 'src/app/providers/userData.service';
import { ModalsService } from 'src/app/shared/modals.service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: 'forgotPassword.html',
})
export class ForgotPasswordModalPage {

  constructor(
    private modalCtrl: ModalController,
    private modalService: ModalsService,
    private userDataService: UserDataService
  ) {

  }

  username = '';
  code = '';
  password = '';
  usernameGiven = false;
  param: any;

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

  async forgotPassword(form: NgForm) {

    if (form.valid) {
      try {
        const res = await this.userDataService.forgotPassword(this.username);

        this.usernameGiven = true;
        this.param = { email: this.username };

      } catch (error) {
        this.modalService.createCognitoErrorAlert(error);
      }
    }
  }

  async confirmCode(form: NgForm) {

    if (form.valid) {
      try {
        const res = await this.userDataService.confirmCodePassword(this.username, this.code, this.password);

        await this.modalService.createToast('auth.forgot.changed');
        this.dismiss();

      } catch (error) {
        this.modalService.createCognitoErrorAlert(error);
      }
    }
  }
}
