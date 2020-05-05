import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  AlertController, IonList, IonRouterOutlet,
  ModalController, ToastController, Config, IonItemSliding
} from '@ionic/angular';

import { UserDataService } from '../../../providers/userData.service';
import { ApiaryListFilterPage } from '../listFilter/listFilter';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';

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
  excludeTracks: any = [];
  allApiaries: any = [];
  groups: any = [];
  confDate: string;
  showSearchbar: boolean;

  constructor(
    public alertCtrl: AlertController,
    public confData: ApiaryDataService,
    public modalCtrl: ModalController,
    public router: Router,
    public routerOutlet: IonRouterOutlet,
    public toastCtrl: ToastController,
    public userDataService: UserDataService,
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

    this.confData.getApiaries(this.queryText).subscribe((data: any) => {
      this.allApiaries = data.apiaries;
      this.groups = data.groups;
    });
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

  async addFavorite(slidingItem: IonItemSliding, sessionData: any) {
    if (this.userDataService.hasFavorite(sessionData.name)) {
      // Prompt to remove favorite
      this.removeFavorite(slidingItem, sessionData, 'Favorite already added');
    } else {
      // Add as a favorite
      this.userDataService.addFavorite(sessionData.name);

      // Close the open item
      slidingItem.close();

      // Create a toast
      const toast = await this.toastCtrl.create({
        header: `${sessionData.name} was successfully added as a favorite.`,
        duration: 3000,
        buttons: [{
          text: 'Close',
          role: 'cancel'
        }]
      });

      // Present the toast at the bottom of the page
      await toast.present();
    }

  }

  async removeFavorite(slidingItem: IonItemSliding, sessionData: any, title: string) {
    const alert = await this.alertCtrl.create({
      header: title,
      message: 'Would you like to remove this session from your favorites?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Remove',
          handler: () => {
            // they want to remove this session from their favorites
            this.userDataService.removeFavorite(sessionData.name);
            this.updateList();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    await alert.present();
  }

  async add() {
    this.router.navigateByUrl('/apiary-detail/new');
  }
}
