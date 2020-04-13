import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EqualValidator } from './equalPassword.directive';
import { PasswordValidator } from './password.directive';
import { IonicModule } from '@ionic/angular';
import { AppLabelComponent } from './appLabel.component';

@NgModule({
  declarations: [EqualValidator, PasswordValidator, AppLabelComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [EqualValidator, PasswordValidator, CommonModule, TranslateModule, AppLabelComponent]
})
export class SharedModule { }
