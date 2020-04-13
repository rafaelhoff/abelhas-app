import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Modals } from '@capacitor/core';


@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    private loadingController: LoadingController,
    private toastController: ToastController,
    private translateService: TranslateService,
  ) {

  }

  async createToast(msgCode: string) {
    const message = this.translateService.instant(msgCode);
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  async createCognitoErrorAlert(error: any) {
    // See error codes in:
    // - https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_ForgotPassword.html#API_ForgotPassword_Errors
    // - https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_SignUp.html#API_SignUp_Errors

    // TODO: Possible errors: ExpiredCodeException, InvalidPasswordException, TooManyFailedAttemptsException, UserNotConfirmedException

    const translateCode = 'aws.' + error.code;
    let errorMsg: string = this.translateService.instant(translateCode);
    if (errorMsg === translateCode) {
      errorMsg = this.translateService.instant('aws.basicError');
    }

    const alertRet = await Modals.alert({
      title: this.translateService.instant('basic.error'),
      message: errorMsg
    });

  }

  async createLoadController(translateCode: string): Promise<any> {
    const initialMsg: string = this.translateService.instant(translateCode);
    const waitMsg: string = this.translateService.instant('basic.pleaseWait');

    const loading = await this.loadingController.create({
      message: initialMsg + waitMsg
    });
    return loading;
  }
}
