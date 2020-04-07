import { Component, Input } from '@angular/core';
import { NavParams, ModalController, AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { ChangePasswordOptions, UserDataService } from 'src/app/providers/user-data';

@Component({
  selector: 'app-chgPwd',
  templateUrl: 'account.chgPwd.html',
})
export class ChangePasswordModalPage {
  changePassword: ChangePasswordOptions = { oldPassword: '', newPpassword: '' };

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController,
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

      let alert = null;
      if (res) {
        alert = await this.createOKAlert(() => this.dismiss());
      } else {
        // TODO: fix error
        alert = await this.createErrorAlert('Something went wrong.');
      }

      await alert.present();
    }
  }

  private async createOKAlert(f) {
    const alert = await this.alertController.create({
      header: this.translateService.instant('account.chgPwd.title'),
      message: this.translateService.instant('account.chgPwd.confirm'),
      buttons: [{
        text: this.translateService.instant('basic.ok'),
        handler: f
      }]
    });
    return alert;
  }

  private async createErrorAlert(errMsg) {
    const alert = await this.alertController.create({
      header: 'ERROR',
      message: errMsg,
      buttons: ['OK']
    });
    return alert;
  }
}
