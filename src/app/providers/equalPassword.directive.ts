import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
    selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => EqualValidator), multi: true }
    ]
})
export class EqualValidator implements Validator {
    constructor(@Attribute('validateEqual') public matchingControlName: string) { }

    validate(control: AbstractControl): ValidationErrors | null {
        const matchingControl = control.root.get(this.matchingControlName);

        if (matchingControl.errors && !matchingControl.errors.validateEqual) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // value not equal
        if (matchingControl && control.value !== matchingControl.value) {
            return { validateEqual: true };
        }
        return null;
    }
}

// // custom validator to check that two fields match
// export function MustMatch(controlName: string, matchingControlName: string) {
//     return (formGroup: FormGroup) => {
//         const control = formGroup.controls[controlName];
//         const matchingControl = formGroup.controls[matchingControlName];

//         // set error on matchingControl if validation fails
//         if (control.value !== matchingControl.value) {
//             matchingControl.setErrors({ mustMatch: true });
//         } else {
//             matchingControl.setErrors(null);
//         }
//     }
// }