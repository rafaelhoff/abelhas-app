import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiaryInfoFormComponent } from '../detail-info/infoForm.component';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-apiary-add',
  templateUrl: 'add.html'
})
export class ApiaryAddPage implements OnInit {

  defaultHref = '';
  @ViewChild('form', { static: true }) form: ApiaryInfoFormComponent;

  constructor(
    private apiaryDataService: ApiaryDataService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.form.formInit();
  }

  ionViewDidEnter() {
    this.defaultHref = `/apiary`;
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
