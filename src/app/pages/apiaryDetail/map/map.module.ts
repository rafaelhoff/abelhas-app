import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ApiaryMapPage } from './map';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ApiaryMapPage }])
  ],
  declarations: [
    ApiaryMapPage,
  ]
})
export class ApiaryMapModule { }
