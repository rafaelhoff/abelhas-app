import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { HiveListPage } from './list/hiveList';
import { HiveDetailInfoPage } from './detail-info/hiveDetailInfo';
import { HiveInfoFormComponent } from './detail-info/hiveDetailInfo.component';

const routes: Routes = [
  { path: '', component: HiveListPage },
  { path: 'new', component: HiveDetailInfoPage },
  { path: ':hiveId', component: HiveDetailInfoPage }
  // {
  //   path: ':apiaryId',
  //   component: ApiaryDetailPage,
  //   children: [
  //     {
  //       path: 'info',
  //       children: [{ path: '', component: ApiaryInfoPage }]
  //     },
  //     {
  //       path: 'map',
  //       children: [{ path: '', component: ApiaryMapPage }]
  //     },
  //     {
  //       path: 'history',
  //       children: [{ path: '', component: ApiaryHistoryPage }]
  //     },
  //     {
  //       path: '',
  //       redirectTo: '/',
  //       pathMatch: 'full'
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    HiveListPage,
    HiveDetailInfoPage,
    HiveInfoFormComponent
  ],
  entryComponents: [HiveInfoFormComponent]
})
export class HiveModule { }
