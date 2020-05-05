import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { UserDataService } from 'src/app/providers/userData.service';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';
import { ApiaryInfoFormComponent } from './infoForm.component';
import { Apiary } from 'src/models';

@Component({
  selector: 'page-apiary-info',
  styleUrls: ['./info.scss'],
  templateUrl: 'info.html'
})
export class ApiaryInfoPage implements OnInit {
  apiaryData: Apiary;
  isFavorite = false;
  defaultHref = '';
  readonly = true;
  apiaryId: string = '';

  @ViewChild('form', { static: true }) form: ApiaryInfoFormComponent;

  constructor(
    private apiaryDataService: ApiaryDataService,
    private userDataService: UserDataService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  ionViewWillEnter() {
    this.apiaryId = this.route.snapshot.parent.parent.paramMap.get('apiaryId');
    this.apiaryDataService.get(this.apiaryId).then((data: Apiary) => {
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
    try {
      // Updating...
      if (!this.readonly && this.form.valid()) {
        this.apiaryDataService.update(this.apiaryId, this.form.getChanges());
      }
    } catch (error) {
      //this.modalService.createCognitoErrorAlert(error);
    }
    this.form.isReadonly = !this.form.isReadonly;
    this.readonly = !this.readonly;
  }
}
