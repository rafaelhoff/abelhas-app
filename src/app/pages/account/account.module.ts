import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { AccountPage } from './account';
import { AccountPageRoutingModule } from './account-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ChangePasswordModalPage } from './chgPwd/account.chgPwd';
import { FormsModule } from '@angular/forms';
import { PhotoLibraryModalPage } from './photoLibrary/account.photoLibrary';
import { CDVPhotoLibraryPipe } from './cdvphotolibrary.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule,
    TranslateModule
  ],
  declarations: [
    AccountPage, ChangePasswordModalPage, PhotoLibraryModalPage, CDVPhotoLibraryPipe
  ],
  entryComponents: [ChangePasswordModalPage, PhotoLibraryModalPage]
})
export class AccountModule { }
