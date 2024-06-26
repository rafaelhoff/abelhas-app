import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { EqualValidator } from './equalPassword.directive';
import { PasswordValidator } from './password.directive';
import { IonicModule } from '@ionic/angular';
import { AppLabelComponent } from './appLabel.component';
import { IconAddMediaComponent } from './iconAddMedia.component';
import { RecordAudioComponent } from './recordAudio.component';
import { IconShareSocialComponent } from '../test/iconShareSocial.component';

@NgModule({
  declarations: [
    EqualValidator,
    PasswordValidator,
    AppLabelComponent,
    IconAddMediaComponent,
    IconShareSocialComponent,
    RecordAudioComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule
  ],
  exports: [
    EqualValidator,
    PasswordValidator,
    CommonModule,
    TranslateModule,
    AppLabelComponent,
    IconAddMediaComponent,
    IconShareSocialComponent,
    RecordAudioComponent
  ]
})
export class SharedModule { }
