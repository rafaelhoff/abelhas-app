import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TutorialPage } from './tutorial';
import { TutorialPageRoutingModule } from './tutorial-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    IonicModule,
    TutorialPageRoutingModule,
    SharedModule
  ],
  declarations: [TutorialPage],
  entryComponents: [TutorialPage],
})
export class TutorialModule { }
