import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { TutorialPage } from './tutorial';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthenticationModule } from 'src/app/auth/auth.module';

@NgModule({
  imports: [
    AuthenticationModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: TutorialPage }]),
    SharedModule
  ],
  declarations: [TutorialPage],
  entryComponents: [TutorialPage],
})
export class TutorialModule { }
