import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from 'src/app/auth/auth.module';

@NgModule({
  imports: [
    AuthenticationModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild([{ path: '', component: AccountPage }]),
    SharedModule
  ],
  declarations: [AccountPage]
})
export class AccountModule { }
