import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login';
import { LoginPageRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    SharedModule
  ],
  declarations: [
    LoginPage,
  ]
})
export class LoginModule { }
