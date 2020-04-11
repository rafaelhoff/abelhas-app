import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from '../auth.module';

@NgModule({
  imports: [
    AuthenticationModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: LoginPage }]),
    SharedModule
  ],
  declarations: [LoginPage]
})
export class LoginModule { }

// TODO: remove? not in use
