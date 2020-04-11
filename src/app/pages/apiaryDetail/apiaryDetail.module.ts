import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ApiaryDetailPage } from './apiaryDetail';
import { ApiaryDetailPageRoutingModule } from './apiaryDetail-routing.module';

import { AboutModule } from '../about/about.module';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    ApiaryDetailPageRoutingModule
  ],
  declarations: [
    ApiaryDetailPage,
  ]
})
export class ApiaryDetailModule { }
