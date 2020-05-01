import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiaryDetailPage } from './apiaryDetail';
import { ApiaryHistoryPage } from './history/history';
import { ApiaryInfoPage } from './info/info';
import { ApiaryMapPage } from './map/map';
import { ApiaryAddPage } from './add/add';


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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiaryDetailPageRoutingModule { }

