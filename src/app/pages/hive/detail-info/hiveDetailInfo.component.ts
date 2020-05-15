import { Component, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hive, Apiary } from 'src/models';
import { ApiaryDataService, ApiaryResults } from 'src/app/providers/apiaryData.service';

@Component({
  selector: 'app-hive-form',
  templateUrl: 'hiveDetailInfo.component.html'
})
export class HiveInfoFormComponent {
  @Input() isReadonly = false;
  model: {
    name: string;
    apiaryId: string;
  } = { name: '', apiaryId: '' };
  apiaryList: Apiary[] = [];
  @ViewChild('hiveInfoForm') hiveInfoForm: NgForm;

  constructor(
    private apiaryDataService: ApiaryDataService
  ) {
    this.apiaryDataService.getApiaries().then((a: ApiaryResults) => this.apiaryList = a.apiaries);
  }

  public init(hiveData: Hive) {
    this.model = {
      name: hiveData.name,
      apiaryId: hiveData.apiary.id
    };
  }

  public getData(): any {
    const result = this.hiveInfoForm.value;
    result.apiary = this.apiaryList.find(e => e.id === result.apiaryId);
    result.latitude = 0;
    result.longitude = 0;

    return result;

  }

  public getChanges(): any {
    return this.getUpdatedValues();
  }

  private getUpdatedValues(): any {
    const updatedFormValues = {};
    this.hiveInfoForm['_forEachChild']((control, name) => {
      if (control.dirty) {
        updatedFormValues[name] = control.value;
      }
    });
    return updatedFormValues;
  }

  public valid(): any {
    return this.hiveInfoForm.valid;
  }

}
