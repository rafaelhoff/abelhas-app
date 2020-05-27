import { Component, Input, ViewChild } from '@angular/core';
import { Apiary } from 'src/models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-apiary-form',
  templateUrl: 'infoForm.component.html'
})
export class ApiaryInfoFormComponent {
  @Input() isReadonly = false;
  // @Input() apiaryId: string;
  model: {
    name: string;
    address: string;
    forages: string[];
    type: string;
  } = { name: '', address: '', forages: [''], type: '' };
  foragesList = ['Eucalipto', 'Flor qualquer', 'Acacia'];
  @ViewChild('apiaryInfoForm') apiaryInfoForm: NgForm;

  public init(apiaryData: Apiary) {
    this.model = {
      name: apiaryData.name,
      address: apiaryData.address,
      forages: apiaryData.forages,
      type: apiaryData.type
    };
  }

  public getData(): any {
    return this.apiaryInfoForm.value;
  }

  public getChanges(): any {
    return this.getUpdatedValues();
  }

  private getUpdatedValues(): any {
    const updatedFormValues = {};
    const key = '_forEachChild';
    this.apiaryInfoForm[key]((control, name) => {
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
