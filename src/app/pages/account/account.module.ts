import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account';
import { AccountPageRoutingModule } from './account-routing.module';
import { ChangePasswordModalPage } from '../../auth/chgPwd/account.chgPwd';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    SharedModule
  ],
  declarations: [
    AccountPage, ChangePasswordModalPage
  ],
  entryComponents: [ChangePasswordModalPage]
})
export class AccountModule { }
