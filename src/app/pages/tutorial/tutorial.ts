import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { IonSlides } from '@ionic/angular';
import { ConfigService } from 'src/app/providers/config-data';
import { UserLoginParams } from 'src/app/providers/userData.service';

@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
  styleUrls: ['./tutorial.scss'],
})
export class TutorialPage {
  showSkip = true;
  credentials: UserLoginParams = { username: '', password: '' };

  @ViewChild('slides', { static: true }) slides: IonSlides;

  constructor(
    public router: Router,
    public configService: ConfigService
  ) { }

  async goToLogin() {
    const lastSlide: number = await this.slides.length();
    this.slides.slideTo(lastSlide - 1);
  }

  async onSlideChangeStart(event) {
    const activeIndex: number = await event.target.getActiveIndex();
    const lastSlide: number = await this.slides.length();
    this.showSkip = (activeIndex < (lastSlide - 2));
    return true;
  }

  ionViewWillEnter() {
    this.configService.isTutorialDone().then(res => {
      if (res === true) {
        this.router.navigateByUrl('/app/tabs/schedule', { replaceUrl: true });
      }
    });
  }
}
