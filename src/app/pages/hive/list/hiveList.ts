import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  IonList, IonRouterOutlet,
  ModalController, Config
} from '@ionic/angular';

import { HiveDataService } from 'src/app/providers/hiveData.service';
import { Hive } from 'src/models';

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
  allHives: Hive[] = [];
  showSearchbar = false;

  constructor(
    public hiveDataService: HiveDataService,
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

    this.hiveDataService.getAll().then((data: Hive[]) => {
      this.allHives = data;
    });
  }

  async presentFilter() {
  }

  // async addFavorite(slidingItem: IonItemSliding, sessionData: any) {
  // }

  // async removeFavorite(slidingItem: IonItemSliding, sessionData: any, title: string) {
  // }

  async add() {
    this.router.navigateByUrl('/hive/new');
  }
}
