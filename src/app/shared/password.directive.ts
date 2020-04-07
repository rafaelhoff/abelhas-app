import { Directive, forwardRef, Attribute } from '@angular/core';
import { Validator, Validators, AbstractControl, NG_VALIDATORS, ValidationErrors, ValidatorFn } from '@angular/forms';

@Directive({
    selector: '[app-password][formControlName],[app-password][formControl],[app-password][ngModel]',
    providers: [
        { provide: NG_VALIDATORS, useExisting: forwardRef(() => PasswordValidator), multi: true }
    ]
})
export class PasswordValidator implements Validator {
    constructor() { }

    validate(control: AbstractControl): ValidationErrors | null {
        let result: ValidationErrors = {};

        // at least 8 characters
        // at least 1 numeric character
        // at least 1 lowercase letter
        // at least 1 uppercase letter
        // at least 1 special character
        result = (Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/)(control) != null) ?
            { password: true } : null;

        return result;
    }
}
