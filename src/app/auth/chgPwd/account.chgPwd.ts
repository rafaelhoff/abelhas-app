import { Component } from '@angular/core';
import { ModalController, AlertController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { ChangePasswordOptions, UserDataService } from 'src/app/providers/UserData.service';

@Component({
  selector: 'app-chgPwd',
  templateUrl: 'account.chgPwd.html',
})
export class ChangePasswordModalPage {
  changePassword: ChangePasswordOptions = { oldPassword: '', newPassword: '', newPasswordRep: '' };

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private toastController: ToastController,
    private translateService: TranslateService,
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
        const message = this.translateService.instant('auth.chgPwdConfirm');
        const toast = await this.toastController.create({
          message,
          duration: 2000
        });
        toast.present();
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
