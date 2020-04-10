import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { ChangePasswordOptions, UserDataService } from 'src/app/providers/userData.service';
import { ModalsService } from 'src/app/shared/modals.service';

@Component({
  selector: 'app-changePassword',
  templateUrl: 'changePassword.html',
})
export class ChangePasswordModalPage {
  changePassword: ChangePasswordOptions = { oldPassword: '', newPassword: '', newPasswordRep: '' };

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
    this.modalCtrl.dismiss({ dismissed: true });
  }

  async passwordChange(form: NgForm) {

    if (form.valid) {
      const res = await this.userDataService.changePassword(this.changePassword);

      if (res) {
        await this.modalService.createToast('auth.chgPwdConfirm');
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
