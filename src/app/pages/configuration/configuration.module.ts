import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ConfigurationPage } from './configuration.page';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    TranslateModule
  ],
  declarations: [ConfigurationPage]
})
export class ConfigurationPageModule { }
