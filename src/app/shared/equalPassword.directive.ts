import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[app-validateEqual][formControlName],[app-validateEqual][formControl],[app-validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor(@Attribute('app-validateEqual') public matchingControlName: string) { }

    validate(control: AbstractControl): ValidationErrors | null {
        const matchingControl = control.root.get(this.matchingControlName);

        // if (matchingControl.errors && !matchingControl.errors.validateEqual) {
        //     // return if another validator has already found an error on the matchingControl
        //     return;
        // }

        // value not equal
        if (matchingControl && control.value !== matchingControl.value) {
            return { validateEqual: true };
        }
        return null;
    }
}
