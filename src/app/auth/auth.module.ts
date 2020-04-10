import { NgModule } from '@angular/core';
import { ChangePasswordModalPage } from './changePassword/changePassword';
import { ConfirmCodeModalPage } from './confirmCode/confirmCode';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ForgotPasswordModalPage } from './forgotPassword/forgotPassword';
import { TermsConditionsModalPage } from './termsConditions/termsConditions';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SharedModule
  ],
  declarations: [ChangePasswordModalPage, ConfirmCodeModalPage, ForgotPasswordModalPage, LoginComponent, TermsConditionsModalPage],
  exports: [ChangePasswordModalPage, ConfirmCodeModalPage, ForgotPasswordModalPage, LoginComponent, TermsConditionsModalPage],
  entryComponents: [ChangePasswordModalPage, ForgotPasswordModalPage, ConfirmCodeModalPage, TermsConditionsModalPage]
})
export class AuthenticationModule { }
