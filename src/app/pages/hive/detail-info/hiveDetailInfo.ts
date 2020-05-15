import { Component, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { HiveInfoFormComponent } from './hiveDetailInfo.component';
import { Hive } from 'src/models';
import { TranslateService } from '@ngx-translate/core';
import { AppLogger } from 'src/app/util/appLogger';
import { HiveDataService } from 'src/app/providers/hiveData.service';

enum PageMode {
  Read = 'R',
  Create = 'C',
  Update = 'U'
}

@Component({
  selector: 'page-hive-info',
  templateUrl: 'hiveDetailInfo.html'
})
export class HiveDetailInfoPage implements OnInit {
  pageTitle = '';
  mode: PageMode = PageMode.Read;

  hiveData: Hive;
  defaultHref = '';
  hiveId = '';

  @ViewChild('form', { static: true }) form: HiveInfoFormComponent;

  constructor(
    private hiveDataService: HiveDataService,
    private activatedRoute: ActivatedRoute,
    private logger: AppLogger,
    private router: Router,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    const isCreate: boolean = (this.activatedRoute.snapshot.url.length > 0 && this.activatedRoute.snapshot.url[0].path === 'new');
    if (isCreate) {
      this.pageTitle = this.translateService.instant('hive.add');
      this.mode = PageMode.Create;
    } else {
      this.pageTitle = this.translateService.instant('hive.info.title');
      this.mode = PageMode.Read;
    }
  }

  ionViewWillEnter() {
    this.hiveId = this.activatedRoute.snapshot.paramMap.get('hiveId');
    if (this.hiveId) {
      this.hiveDataService.get(this.hiveId).then((data: Hive) => {
        this.hiveData = data;
        this.form.init(this.hiveData);
      });
    }
  }

  ionViewDidEnter() {
    this.defaultHref = `/hive`;
  }

  async toggleFavorite() {
    try {
      this.hiveData = await this.hiveDataService.update(this.hiveData.id, { favorite: !this.hiveData.favorite });
    } catch (error) {
      // TODO: check the error;
      this.logger.error(error);
    }
  }

  async switchEdit() {
    try {
      // Updating...
      if (this.mode === PageMode.Update && this.form.valid()) {
        this.hiveDataService.update(this.hiveId, this.form.getChanges());
      }
    } catch (error) {
      // this.modalService.createCognitoErrorAlert(error);
    }
    this.mode = (this.mode === PageMode.Read) ? PageMode.Update : PageMode.Read;
    this.form.isReadonly = !this.form.isReadonly;
  }

  async cancelChanges() {
    this.form.init(this.hiveData);
    this.form.isReadonly = !this.form.isReadonly;
    this.mode = (this.mode === PageMode.Read) ? PageMode.Update : PageMode.Read;
  }

  onSave() {
    try {
      const data: any = this.form.getData();
      this.hiveDataService.create(data);
      this.router.navigateByUrl(this.defaultHref);
    } catch (error) {
      // TODO: add error;
    }
  }
}
