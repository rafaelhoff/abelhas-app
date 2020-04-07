import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SignupPage } from './signup';
import { SignupPageRoutingModule } from './signup-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    SignupPageRoutingModule,
    SharedModule
  ],
  declarations: [SignupPage]
})
export class SignUpModule { }
