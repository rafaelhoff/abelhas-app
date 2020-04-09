import { NgModule } from '@angular/core';
import { ChangePasswordModalPage } from './chgPwd/account.chgPwd';
import { ConfirmCodeModalPage } from './confirmCode/confirmCode';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SharedModule
  ],
  declarations: [ChangePasswordModalPage, ConfirmCodeModalPage, LoginComponent],
  exports: [ChangePasswordModalPage, ConfirmCodeModalPage, LoginComponent],
  entryComponents: [ChangePasswordModalPage, ConfirmCodeModalPage]
})
export class AuthenticationModule { }
