import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ApiaryPage } from './list/apiary';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiaryListFilterPage } from './listFilter/listFilter';
import { ApiaryDetailPage } from './detail-tab/apiaryDetail';
import { ApiaryInfoPage } from './detail-info/info';
import { ApiaryMapPage } from './detail-map/map';
import { ApiaryActivityPage } from './detail-activity/activity';
import { ApiaryInfoFormComponent } from './detail-info/infoForm.component';

const routes: Routes = [
  { path: '', component: ApiaryPage },
  { path: 'new', component: ApiaryInfoPage },
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
        path: 'activity',
        children: [{ path: '', component: ApiaryActivityPage }]
      },
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    ApiaryPage,
    ApiaryListFilterPage,
    ApiaryDetailPage,
    ApiaryInfoPage,
    ApiaryMapPage,
    ApiaryActivityPage,
    ApiaryInfoFormComponent
  ],
  entryComponents: [
    ApiaryListFilterPage, ApiaryInfoFormComponent
  ]
})
export class ApiaryModule { }
