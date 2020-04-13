import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  template: `<ion-label position="floating" color="primary">{{ tCode | translate }}  <ion-text *ngIf="required" color="danger">*</ion-text></ion-label>`
})
export class AppLabelComponent {
  @Input() tCode: string;
  @Input() required = true;

}
