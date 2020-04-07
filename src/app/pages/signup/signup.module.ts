import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup';
import { SignupPageRoutingModule } from './signup-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EqualValidator } from 'src/app/providers/equalPassword.directive';
import { PasswordValidator } from 'src/app/providers/password.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    SignupPage, EqualValidator, PasswordValidator
  ]
})
export class SignUpModule { }
