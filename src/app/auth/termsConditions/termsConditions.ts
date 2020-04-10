import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-termsConditions',
  templateUrl: 'termsConditions.html',
})
export class TermsConditionsModalPage {

  constructor(
    private modalCtrl: ModalController,
  ) {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss();
  }
}
