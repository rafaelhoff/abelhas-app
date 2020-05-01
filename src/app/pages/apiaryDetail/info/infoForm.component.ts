import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiaryInfo, ApiaryDataService } from 'src/app/providers/apiaryData.service';

@Component({
  selector: 'app-apiary-form',
  templateUrl: 'infoForm.component.html'
})
export class ApiaryInfoFormComponent {
  @Input() isReadonly: boolean = false;
  // @Input() apiaryId: string;
  private data: ApiaryInfo = {
    _id: '',
    name: '',
    address: '',
    forages: [],
    type: '',
    hives: 0
  };
  apiaryInfoForm: FormGroup;

  constructor(
    private confData: ApiaryDataService
  ) {
    this.formInit();
  }

  public init(apiaryData: ApiaryInfo) {
    this.data = apiaryData;
    this.formInit();
  }

  private formInit() {
    this.apiaryInfoForm = new FormGroup({
      name: new FormControl(this.data.name),
      address: new FormControl(this.data.address),
      forages: new FormControl(this.data.forages),
      type: new FormControl(this.data.type)
    });
  }

  public getData(): any {
    return this.apiaryInfoForm.value;
  }

}
