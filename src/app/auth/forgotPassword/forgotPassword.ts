import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserDataService } from 'src/app/providers/userData.service';
import { ModalsService } from 'src/app/shared/modals.service';

@Component({
  selector: 'app-forgotPassword',
  templateUrl: 'forgotPassword.html',
})
export class ForgotPasswordModalPage {
  username = '';
  code = '';
  password = '';
  usernameGiven = false;
  param: any;

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private modalService: ModalsService,
    private userDataService: UserDataService
  ) {

  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }

  async forgotPassword(form: NgForm) {

    if (form.valid) {
      const res = await this.userDataService.forgotPassword(this.username);

      if (res) {
        this.usernameGiven = true;
        this.param = { email: this.username };
      } else {
        // TODO: fix error
        const alert = await this.alertController.create({
          header: 'ERROR',
          message: 'Something went wrong.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }

  async confirmCode(form: NgForm) {

    if (form.valid) {
      const res = await this.userDataService.confirmCodePassword(this.username, this.code, this.password);

      if (res) {
        await this.modalService.createToast('auth.forgot.changed');
        this.dismiss();
      } else {
        // TODO: fix error
        const alert = await this.alertController.create({
          header: 'ERROR',
          message: 'Something went wrong.',
          buttons: ['OK']
        });
        await alert.present();
      }
    }
  }
}
