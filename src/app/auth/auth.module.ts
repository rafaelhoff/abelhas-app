import { NgModule } from '@angular/core';
import { ChangePasswordModalPage } from './changePassword/changePassword';
import { ConfirmCodeModalPage } from './confirmCode/confirmCode';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordModalPage } from './forgotPassword/forgotPassword';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SharedModule
  ],
  declarations: [ChangePasswordModalPage, ConfirmCodeModalPage, ForgotPasswordModalPage, LoginComponent],
  exports: [ChangePasswordModalPage, ConfirmCodeModalPage, ForgotPasswordModalPage, LoginComponent],
  entryComponents: [ChangePasswordModalPage, ForgotPasswordModalPage, ConfirmCodeModalPage]
})
export class AuthenticationModule { }
