import { Component, Input } from '@angular/core';
import { ModalController, AlertController, NavParams } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserDataService } from 'src/app/providers/userData.service';
import { ModalsService } from 'src/app/shared/modals.service';

@Component({
  selector: 'app-confirmCode',
  templateUrl: 'confirmCode.html',
})
export class ConfirmCodeModalPage {
  code = '';

  @Input() username: string;
  public param: any;

  constructor(
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private modalService: ModalsService,
    private userDataService: UserDataService,
    private navParams: NavParams
  ) {
    this.param = { email: navParams.get('username') };
  }

  dismiss(confirmed: boolean) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({ confirmed });
  }

  async confirmCode(form: NgForm) {

    if (form.valid) {
      const res = await this.userDataService.confirmCode(this.username, this.code);

      if (res) {
        await this.modalService.createToast('auth.confirm.confirmed');
        this.dismiss(true);
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
