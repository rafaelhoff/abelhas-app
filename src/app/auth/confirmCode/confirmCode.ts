import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { UserDataService, UserLoginParams } from 'src/app/providers/userData.service';
import { ModalsService } from 'src/app/shared/modals.service';

@Component({
  selector: 'app-confirmCode',
  templateUrl: 'confirmCode.html',
})
export class ConfirmCodeModalPage implements OnInit {
  code = '';

  @Input() user: UserLoginParams;
  public param: any;

  constructor(
    private modalCtrl: ModalController,
    private modalService: ModalsService,
    private userDataService: UserDataService
  ) {
  }

  ngOnInit(): void {
    this.param = { email: this.user.username };
  }

  dismiss(confirmed: boolean) {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({ confirmed });
  }

  async confirmCode(form: NgForm) {

    if (form.valid) {
      const loading = await this.modalService.createLoadController('auth.confirm.confirming');

      try {
        await loading.present();
        const res = await this.userDataService.confirmCodeSignUp(this.user, this.code);
        await loading.dismiss();

        await this.modalService.createToast('auth.confirm.confirmed');
        this.dismiss(true);

      } catch (error) {
        await loading.dismiss();
        if (error.code === 'NotAuthorizedException') {
          this.dismiss(false);
        }
        await this.modalService.createCognitoErrorAlert(error);
      }
    }
  }

  async resendCode() {
    try {
      await this.userDataService.resendConfirmCodeSignUp(this.user);
      await this.modalService.createToast('auth.confirm.codeSentAgain');
    } catch (error) {
      await this.modalService.createCognitoErrorAlert(error);
    }
  }
}
