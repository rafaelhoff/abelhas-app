import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-label',
  template: `<ion-label position="floating" color="primary" style="margin-top:10px;"><ng-content></ng-content> <ion-text *ngIf="required" color="danger">*</ion-text></ion-label>`
})
export class AppLabelComponent {
  @Input() required = true;
}
