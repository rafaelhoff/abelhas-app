import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfigurationPage } from './configuration.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ConfigurationPage }]),
    SharedModule
  ],
  declarations: [ConfigurationPage]
})
export class ConfigurationPageModule { }
