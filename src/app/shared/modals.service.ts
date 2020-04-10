import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';


@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(
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

}

