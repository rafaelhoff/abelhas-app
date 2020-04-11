import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ApiaryPage } from './list/apiary';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ApiaryListFilterPage } from './listFilter/listFilter';

@NgModule({
  imports: [
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: ApiaryPage }]),
    SharedModule
  ],
  declarations: [
    ApiaryPage,
    ApiaryListFilterPage
  ],
  entryComponents: [
    ApiaryListFilterPage
  ]
})
export class ApiaryModule { }
