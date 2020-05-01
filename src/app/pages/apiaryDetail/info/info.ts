import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/providers/userData.service';
import { ApiaryDataService, ApiaryInfo } from 'src/app/providers/apiaryData.service';
import { ApiaryInfoFormComponent } from './infoForm.component';

@Component({
  selector: 'page-apiary-info',
  styleUrls: ['./info.scss'],
  templateUrl: 'info.html'
})
export class ApiaryInfoPage implements OnInit {
  apiaryData: ApiaryInfo;
  isFavorite = false;
  defaultHref = '';
  readonly = true;

  @ViewChild('form', { static: true }) form: ApiaryInfoFormComponent;

  constructor(
    private confData: ApiaryDataService,
    private userDataService: UserDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    const apiaryId = this.route.snapshot.parent.parent.paramMap.get('apiaryId');
    this.confData.get(apiaryId).subscribe((data: ApiaryInfo) => {
      this.apiaryData = data;
      this.form.init(this.apiaryData);
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/apiary`;
  }

  toggleFavorite() {
    if (this.userDataService.hasFavorite(this.apiaryData.name)) {
      this.userDataService.removeFavorite(this.apiaryData.name);
      this.isFavorite = false;
    } else {
      this.userDataService.addFavorite(this.apiaryData.name);
      this.isFavorite = true;
    }
  }

  shareSession() {
    // console.log('Clicked share session');
  }

  async add() {
    console.log('added');
  }

  async addPicture() {
    console.log('picture added.');
  }

  async uploadFile() {
    console.log('uploadFile');
  }

  async switchEdit() {
    this.form.isReadonly = !this.form.isReadonly;
    this.readonly = !this.readonly;
  }
}
