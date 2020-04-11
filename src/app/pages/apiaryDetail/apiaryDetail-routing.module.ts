import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiaryDetailPage } from './apiaryDetail';


const routes: Routes = [
  {
    path: ':apiaryId',
    component: ApiaryDetailPage,
    children: [
      {
        path: 'info',
        children: [
          {
            path: '',
            loadChildren: () => import('./info/info.module').then(m => m.ApiaryInfoModule)
          }
        ]
      },
      {
        path: 'map',
        children: [
          {
            path: '',
            loadChildren: () => import('./map/map.module').then(m => m.ApiaryMapModule)
          }
        ]
      },
      {
        path: 'history',
        children: [
          {
            path: '',
            loadChildren: () => import('./history/history.module').then(m => m.ApiaryHistoryModule)
          }
        ]
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

