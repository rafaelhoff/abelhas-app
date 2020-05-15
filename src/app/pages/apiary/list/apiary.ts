import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonList, IonRouterOutlet,
  ModalController, Config
} from '@ionic/angular';

import { ApiaryListFilterPage } from '../listFilter/listFilter';
import { ApiaryDataService, ApiaryResults } from 'src/app/providers/apiaryData.service';
import { HiveDataService } from 'src/app/providers/hiveData.service';

enum Segments {
  All = 'all',
  Favorites = 'favorites'
}

@Component({
  selector: 'page-apiary',
  templateUrl: 'apiary.html',
  styleUrls: ['./apiary.scss'],
})
export class ApiaryPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('apiaryList', { static: true }) apiaryList: IonList;

  ios: boolean;
  queryText = '';
  segment: Segments = Segments.All;
  excludeTracks: any = [];
  allApiaries: any = [];
  allHives: any[] = [];
  groups: any = [];
  showSearchbar = false;

  constructor(
    private apiaryDataService: ApiaryDataService,
    private hiveDataService: HiveDataService,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public config: Config
  ) { }

  ngOnInit() {
    this.updateList();

    this.ios = this.config.get('mode') === 'ios';
  }

  ionViewDidEnter() {
    this.updateList();
  }

  updateList() {
    // Close any open sliding items when the list updates
    if (this.apiaryList) {
      this.apiaryList.closeSlidingItems();
    }

    const process = (data: ApiaryResults) => {
      this.allHives = [];
      const hivePromises = [];
      data.apiaries.forEach(a => hivePromises.push(this.hiveDataService.getAllByApiary(a.id)));

      Promise.all(hivePromises).then((hiveData: any[]) => {
        hiveData.forEach((hd, index) => {
          this.allHives.push({
            apiaryId: data.apiaries[index].id,
            data: hd
          });
        });
        this.allApiaries = data.apiaries;
        this.groups = data.groups;
      });
    };

    if (this.segment === Segments.All) {
      this.apiaryDataService.getApiaries(this.queryText).then(process);
    } else {
      this.apiaryDataService.getFavorites().then(process);
    }
  }

  async presentFilter() {
    const modal = await this.modalCtrl.create({
      component: ApiaryListFilterPage,
      swipeToClose: true,
      presentingElement: this.routerOutlet.nativeEl,
      componentProps: { excludedTracks: this.excludeTracks }
    });
    await modal.present();

    const { data } = await modal.onWillDismiss();
    if (data) {
      this.excludeTracks = data;
      this.updateList();
    }
  }

  // async addFavorite(slidingItem: IonItemSliding, sessionData: any) {
  // }

  // async removeFavorite(slidingItem: IonItemSliding, sessionData: any, title: string) {
  // }

  async add() {
    this.router.navigateByUrl('/apiary/new');
  }

  getHiveCount(apiaryId: string) {
    const result = this.allHives.find(e => e.apiaryId === apiaryId);
    return (result) ? result.data.length : 0;
  }
}
