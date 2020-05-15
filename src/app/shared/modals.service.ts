import { Injectable } from '@angular/core';
import { ToastController, LoadingController, ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Modals } from '@capacitor/core';
import { AppLogger } from '../util/appLogger';


@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
    public actionSheetController: ActionSheetController,
    private logger: AppLogger,
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
    // TODO: in case an unkwown error, push to a monitoring system.

    const translateCode = 'aws.' + error.code;
    let errorMsg: string = this.translateService.instant(translateCode);
    if (errorMsg === translateCode) {
      errorMsg = this.translateService.instant('aws.basicError');
      this.logger.error(JSON.stringify(error));
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

  async createPictureActionSheet(handler: any) {
    const actionSheet = await this.actionSheetController.create({
      header: this.translateService.instant('account.chgpic'),
      buttons: [{
        text: this.translateService.instant('account.takePhoto'),
        icon: 'share',
        handler: async () => {
          handler(true);
        }
      }, {
        text: this.translateService.instant('account.fromLibrary'),
        icon: 'arrow-dropright-circle',
        handler: () => {
          handler(false);
        }
      }, {
        text: this.translateService.instant('basic.cancel'),
        icon: 'close',
        role: 'cancel'
      }]
    });
    return actionSheet;
  }
}
