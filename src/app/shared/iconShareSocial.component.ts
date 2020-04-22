import { Component, Input } from '@angular/core';
import { IonFab, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-icon-share',
  template: `<ion-fab slot="fixed" vertical="bottom" horizontal="end" #fab>
  <ion-fab-button>
    <ion-icon name="share-social"></ion-icon>
  </ion-fab-button>
  <ion-fab-list side="top">
    <ion-fab-button color="vimeo" (click)="openSocial('Vimeo', fab)">
      <ion-icon name="logo-vimeo"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="instagram" (click)="openSocial('Instagram', fab)">
      <ion-icon name="logo-instagram"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="twitter" (click)="openSocial('Twitter', fab)">
      <ion-icon name="logo-twitter"></ion-icon>
    </ion-fab-button>
    <ion-fab-button color="facebook" (click)="openSocial('Facebook', fab)">
      <ion-icon name="logo-facebook"></ion-icon>
    </ion-fab-button>
  </ion-fab-list>
  </ion-fab>`
})
export class IconShareSocialComponent {
  constructor(
    private loadingCtrl: LoadingController
  ) { }

  // TODO: can be deleted in future.

  async openSocial(network: string, fab: IonFab) {
    const loading = await this.loadingCtrl.create({
      message: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    await loading.present();
    await loading.onWillDismiss();
    fab.close();
  }
}
