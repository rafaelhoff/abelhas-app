import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../auth.module';

@NgModule({
  imports: [
    AuthenticationModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: SignupPage }]),
    SharedModule
  ],
  declarations: [SignupPage]
})
export class SignUpModule { }
