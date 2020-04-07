import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account';
import { AccountPageRoutingModule } from './account-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePasswordModalPage } from '../../auth/chgPwd/account.chgPwd';
import { FormsModule } from '@angular/forms';
import { EqualValidator } from 'src/app/providers/equalPassword.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    AccountPage, ChangePasswordModalPage, EqualValidator
  ],
  entryComponents: [ChangePasswordModalPage]
})
export class AccountModule { }
