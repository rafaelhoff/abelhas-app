import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { ConferenceData } from 'src/app/providers/conference-data';
import { UserDataService } from 'src/app/providers/userData.service';

@Component({
  selector: 'page-apiary-info',
  styleUrls: ['./info.scss'],
  templateUrl: 'info.html'
})
export class ApiaryInfoPage {
  session: any;
  isFavorite = false;
  defaultHref = '';

  constructor(
    private dataProvider: ConferenceData,
    private userDataService: UserDataService,
    private route: ActivatedRoute
  ) { }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.schedule && data.schedule[0] && data.schedule[0].groups) {
        const sessionId = this.route.snapshot.paramMap.get('sessionId');
        for (const group of data.schedule[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === sessionId) {
                this.session = session;

                this.isFavorite = this.userDataService.hasFavorite(
                  this.session.name
                );

                break;
              }
            }
          }
        }
      }
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/apiary`;
  }

  sessionClick(item: string) {
    // console.log('Clicked', item);
  }

  toggleFavorite() {
    if (this.userDataService.hasFavorite(this.session.name)) {
      this.userDataService.removeFavorite(this.session.name);
      this.isFavorite = false;
    } else {
      this.userDataService.addFavorite(this.session.name);
      this.isFavorite = true;
    }
  }

  shareSession() {
    // console.log('Clicked share session');
  }
}
