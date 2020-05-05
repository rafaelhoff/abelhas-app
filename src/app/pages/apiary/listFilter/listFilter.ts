import { Component } from '@angular/core';
import { Config, ModalController, NavParams } from '@ionic/angular';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';


@Component({
  selector: 'page-apiary-list-filter',
  templateUrl: 'listFilter.html',
  styleUrls: ['./listFilter.scss'],
})
export class ApiaryListFilterPage {
  ios: boolean;

  tracks: { name: string, icon: string, isChecked: boolean }[] = [];

  constructor(
    public confData: ApiaryDataService,
    private config: Config,
    public modalCtrl: ModalController,
    public navParams: NavParams
  ) { }

  ionViewWillEnter() {
    this.ios = this.config.get('mode') === `ios`;

    // passed in array of track names that should be excluded (unchecked)
    const excludedTrackNames = this.navParams.get('excludedTracks');

    // this.confData.getApiaries().subscribe((tracks: ApiaryInfo[]) => {
    //   tracks.forEach(track => {
    //     this.tracks.push({
    //       name: track.name,
    //       icon: track.icon,
    //       isChecked: (excludedTrackNames.indexOf(track.name) === -1)
    //     });
    //   });
    // });
  }

  selectAll(check: boolean) {
    // set all to checked or unchecked
    this.tracks.forEach(track => {
      track.isChecked = check;
    });
  }

  applyFilters() {
    // Pass back a new array of track names to exclude
    const excludedTrackNames = this.tracks.filter(c => !c.isChecked).map(c => c.name);
    this.dismiss(excludedTrackNames);
  }

  dismiss(data?: any) {
    // using the injected ModalController this page
    // can "dismiss" itself and pass back data
    this.modalCtrl.dismiss(data);
  }
}
