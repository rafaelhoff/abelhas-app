import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiaryDataService } from 'src/app/providers/apiaryData.service';
import { Apiary } from 'src/models';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-apiary-form',
  templateUrl: 'infoForm.component.html'
})
export class ApiaryInfoFormComponent {
  @Input() isReadonly: boolean = false;
  // @Input() apiaryId: string;
  private data: Apiary = {
    id: '',
    name: '',
    address: '',
    forages: [],
    type: '',
    hives: []
  };
  apiaryInfoForm: FormGroup;
  forages = ['acacia', 'aroeira', 'outras'];

  constructor(
    private confData: ApiaryDataService,
    private translateService: TranslateService
  ) {
    this.formInit();
  }

  public init(apiaryData: Apiary) {
    this.data = apiaryData;
    this.formInit();
  }

  private formInit() {
    const validations = (this.isReadonly) ? null : [Validators.required];

    this.apiaryInfoForm = new FormGroup({
      name: new FormControl(this.data.name, validations),
      address: new FormControl(this.data.address, validations),
      forages: new FormControl({ value: this.data.forages, disabled: this.isReadonly }, validations),
      type: new FormControl(this.data.type, validations)
    });
  }

  public getData(): any {
    return this.apiaryInfoForm.value;
  }

  public getChanges(): any {
    return this.getUpdatedValues();
  }

  private getUpdatedValues(): any {
    const updatedFormValues = {};
    this.apiaryInfoForm['_forEachChild']((control, name) => {
      if (control.dirty) {
        updatedFormValues[name] = control.value;
      }
    });
    return updatedFormValues;
  }

  public valid(): any {
    return this.apiaryInfoForm.valid;
  }

}
