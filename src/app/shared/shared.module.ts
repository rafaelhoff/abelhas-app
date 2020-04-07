import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { EqualValidator } from './equalPassword.directive';
import { PasswordValidator } from './password.directive';

@NgModule({
  declarations: [EqualValidator, PasswordValidator],
  imports: [
    CommonModule
  ],
  exports: [EqualValidator, PasswordValidator, CommonModule, TranslateModule]
})
export class SharedModule { }
