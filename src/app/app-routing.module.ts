import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckTutorialService } from './providers/checkTutorial.service';
import { LoggedInService } from './providers/loggedIn.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/apiary',
    pathMatch: 'full'
  },
  {
    path: 'apiary',
    loadChildren: () => import('./pages/apiary/apiary.module').then(m => m.ApiaryModule),
    canActivate: [LoggedInService]
  },
  {
    path: 'hive',
    loadChildren: () => import('./pages/hive/hive.module').then(m => m.HiveModule),
    canActivate: [LoggedInService]
  },
  {
    path: 'account',
    loadChildren: () => import('./pages/account/account.module').then(m => m.AccountModule),
    canActivate: [LoggedInService]
  },
  {
    path: 'configuration',
    loadChildren: () => import('./pages/configuration/configuration.module').then(m => m.ConfigurationPageModule),
    canActivate: [LoggedInService]
  },
  {
    path: 'support',
    loadChildren: () => import('./pages/support/support.module').then(m => m.SupportModule),
    canActivate: [LoggedInService]
  },
  {
    path: 'login',
    redirectTo: '/tutorial',
    pathMatch: 'full'
  },
  {
    path: 'signup',
    loadChildren: () => import('./auth/signup/signup.module').then(m => m.SignUpModule)
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then(m => m.TutorialModule),
    canActivate: [CheckTutorialService]
  },

  // THESE ARE THE TEST ROUTES FROM HERE ON...
  {
    path: 'app',
    loadChildren: () => import('./test/tabs-page/tabs-page.module').then(m => m.TabsModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then(m => m.AboutModule)
  },
  {
    path: 'testing',
    loadChildren: () => import('./test/general/testing.module').then(m => m.TestingModule)
  },
  {
    path: 'camera',
    loadChildren: () => import('./test/camera/camera.module').then(m => m.CameraPageModule)
  },
  {
    path: 'pictures',
    loadChildren: () => import('./test/pictures/picture.module').then(m => m.PictureModule)
  },
  {
    path: 'voice',
    loadChildren: () => import('./test/voicerecording/voicerecording.module').then(m => m.VoiceRecordingModule)
  },
  {
    path: 'timeline',
    loadChildren: () => import('./test/timeline/timeline.module').then(m => m.HomePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
