import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { UserDataService } from 'src/app/providers/userData.service';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';
import { ApiaryInfoFormComponent } from './infoForm.component';
import { Apiary } from 'src/models';
import { TranslateService } from '@ngx-translate/core';

enum PageMode {
  Read = 'R',
  Create = 'C',
  Update = 'U'
}

@Component({
  selector: 'page-apiary-info',
  styleUrls: ['./info.scss'],
  templateUrl: 'info.html'
})
export class ApiaryInfoPage implements OnInit {
  pageTitle = '';
  mode: PageMode = PageMode.Read;

  apiaryData: Apiary;
  defaultHref = '';
  apiaryId: string = '';

  @ViewChild('form', { static: true }) form: ApiaryInfoFormComponent;

  constructor(
    private apiaryDataService: ApiaryDataService,
    private userDataService: UserDataService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    const isCreate: boolean = (this.activatedRoute.snapshot.url.length > 0 && this.activatedRoute.snapshot.url[0].path === 'new');
    if (isCreate) {
      this.pageTitle = this.translateService.instant('apiary.add');
      this.mode = PageMode.Create;
    } else {
      this.pageTitle = this.translateService.instant('apiary.info.title');
      this.mode = PageMode.Read;
    }
  }

  ionViewWillEnter() {
    this.apiaryId = this.activatedRoute.snapshot.parent.parent.paramMap.get('apiaryId');
    this.apiaryDataService.get(this.apiaryId).then((data: Apiary) => {
      this.apiaryData = data;
      this.form.init(this.apiaryData);
    });
  }

  ionViewDidEnter() {
    this.defaultHref = `/apiary`;
  }

  async toggleFavorite() {
    try {
      this.apiaryData = await this.apiaryDataService.update(this.apiaryData.id, { favorite: !this.apiaryData.favorite });
    } catch (error) {
      // TODO: check the error;
      console.log(error);
    }
  }

  async switchEdit() {
    try {
      // Updating...
      if (this.mode === PageMode.Update && this.form.valid()) {
        this.apiaryDataService.update(this.apiaryId, this.form.getChanges());
      }
    } catch (error) {
      // this.modalService.createCognitoErrorAlert(error);
    }
    this.mode = (this.mode === PageMode.Read) ? PageMode.Update : PageMode.Read;
    this.form.isReadonly = !this.form.isReadonly;
  }

  async cancelChanges() {
    this.form.init(this.apiaryData);
    this.form.isReadonly = !this.form.isReadonly;
    this.mode = (this.mode === PageMode.Read) ? PageMode.Update : PageMode.Read;
  }

  onSave() {
    try {
      const data: any = this.form.getData();
      this.apiaryDataService.create(data);
      this.router.navigateByUrl(this.defaultHref);
    } catch (error) {
      // TODO: add error;
    }
  }
}
