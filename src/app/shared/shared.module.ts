import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EqualValidator } from './equalPassword.directive';
import { PasswordValidator } from './password.directive';
import { RequiredComponent } from './required.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [EqualValidator, PasswordValidator, RequiredComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [EqualValidator, PasswordValidator, CommonModule, TranslateModule, RequiredComponent]
})
export class SharedModule { }
