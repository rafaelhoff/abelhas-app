import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ApiaryDetailPage } from './detail-tab/apiaryDetail';

import { AboutModule } from '../about/about.module';
import { ApiaryHistoryPage } from './detail-history/history';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiaryInfoPage } from './detail-info/info';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiaryMapPage } from './detail-map/map';
import { ApiaryInfoFormComponent } from './detail-info/infoForm.component';
import { ApiaryAddPage } from './detail-add/add';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'new',
    component: ApiaryAddPage
  },
  {
    path: ':apiaryId',
    component: ApiaryDetailPage,
    children: [
      {
        path: 'info',
        children: [{ path: '', component: ApiaryInfoPage }]
      },
      {
        path: 'map',
        children: [{ path: '', component: ApiaryMapPage }]
      },
      {
        path: 'history',
        children: [{ path: '', component: ApiaryHistoryPage }]
      },
      {
        // TODO: fix this route here.
        path: '',
        redirectTo: '/app/tabs/schedule',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    AboutModule,
    CommonModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    ApiaryDetailPage,
    ApiaryInfoPage,
    ApiaryMapPage,
    ApiaryHistoryPage,
    ApiaryAddPage,
    ApiaryInfoFormComponent
  ]
})
export class ApiaryDetailModule { }
