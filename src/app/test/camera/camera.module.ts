import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CameraPage } from './camera';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    IonicModule,
    RouterModule.forChild([{ path: '', component: CameraPage }])
  ],
  declarations: [CameraPage],
})
export class CameraPageModule { }
