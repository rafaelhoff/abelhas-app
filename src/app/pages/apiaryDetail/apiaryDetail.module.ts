import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ApiaryDetailPage } from './apiaryDetail';
import { ApiaryDetailPageRoutingModule } from './apiaryDetail-routing.module';

import { AboutModule } from '../about/about.module';
import { ApiaryHistoryPage } from './history/history';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiaryInfoPage } from './info/info';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiaryMapPage } from './map/map';

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    ApiaryDetailPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ApiaryDetailPage,
    ApiaryInfoPage,
    ApiaryMapPage,
    ApiaryHistoryPage
  ]
})
export class ApiaryDetailModule { }
