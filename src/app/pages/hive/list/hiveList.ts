import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonList, IonRouterOutlet,
  ModalController, Config
} from '@ionic/angular';

import { ApiaryDataService } from 'src/app/providers/apiaryData.service';

enum Segments {
  All = 'all',
  Favorites = 'favorites'
}

@Component({
  selector: 'page-hive-list',
  templateUrl: 'hiveList.html',
  styleUrls: ['./hiveList.scss'],
})
export class HiveListPage implements OnInit {
  // Gets a reference to the list element
  @ViewChild('apiaryList', { static: true }) apiaryList: IonList;

  ios: boolean;
  queryText = '';
  segment: Segments = Segments.All;
  excludeTracks: any = [];
  allApiaries: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean = false;

  constructor(
    public apiaryDataService: ApiaryDataService,
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

    if (this.segment === Segments.All) {
      this.apiaryDataService.getApiaries(this.queryText).then((data: any) => {
        this.allApiaries = data.apiaries;
        this.groups = data.groups;
      });
    } else {
      this.apiaryDataService.getFavorites().then((data: any) => {
        this.allApiaries = data.apiaries;
        this.groups = data.groups;
      });
    }
  }

  async presentFilter() {
  }

  // async addFavorite(slidingItem: IonItemSliding, sessionData: any) {
  // }

  // async removeFavorite(slidingItem: IonItemSliding, sessionData: any, title: string) {
  // }

  async add() {
    this.router.navigateByUrl('/apiary/new');
  }
}
