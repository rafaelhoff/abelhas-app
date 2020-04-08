import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmCodeModalPage } from '../confirmCode/confirmCode';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    SharedModule
  ],
  declarations: [SignupPage, ConfirmCodeModalPage],
  entryComponents: [ConfirmCodeModalPage]
})
export class SignUpModule { }
