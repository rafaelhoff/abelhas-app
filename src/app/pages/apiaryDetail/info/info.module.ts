import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ApiaryInfoPage } from './info';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ApiaryInfoPage }])
  ],
  declarations: [
    ApiaryInfoPage,
  ]
})
export class ApiaryInfoModule { }
