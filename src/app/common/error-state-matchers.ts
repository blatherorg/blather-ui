import { ErrorStateMatcher } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormGroupDirective, NgForm, AbstractControl, Validators, ValidationErrors } from '@angular/forms';

export const BlatherFormErrors: { [key: string]: string } = {
    oldPasswordRequired: 'Old password required',
    minLength: 'Password must contain at least 8 characters.',
    passwordMismatch: 'Passwords don\'t match.',
    passwordStrength: 'Password must have: numbers, lowercase letters, uppercase letters, and special characters.',
    passwordConfirmRequired: 'Password confirmation required'
};

/*
Custom Form Validators
*/
export const PasswordMatchValidator = function (control: AbstractControl): null {
    const password1: string = control.get('newPassword1').value || '';
    const password2: string = control.get('newPassword2').value || '';
    if (!password2) {
        return null
    }
    
    if (password1 !== password2) {
        control.get('newPassword2').setErrors({ passwordMismatch: BlatherFormErrors.passwordMismatch })
    }
}

export const PasswordStrengthValidator = function (control: AbstractControl): ValidationErrors | null {
    const value: string = control.value || '';
    if (!value) {
        return null
    }

    const upperCaseCharacters = /[A-Z]+/g;
    const lowerCaseCharacters = /[a-z]+/g;
    const numberCharacters = /[0-9]+/g;
    const specialCharacters = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
    if (upperCaseCharacters.test(value) === false || lowerCaseCharacters.test(value) === false || numberCharacters.test(value) === false || specialCharacters.test(value) === false) {
        return { passwordStrength: BlatherFormErrors.passwordStrength }
    }
}

// /*
// Custom Error State Matchers
// */
// export class PasswordMatchErrorMatcher implements ErrorStateMatcher {
//     isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//         console.log('touched: ' + control.touched);
//         console.log('dirty: ' + control.dirty);
//         console.log('invalid: ' + control.invalid);

//         return (control.touched || control.dirty) && ('newPassword1').value !== form.get('newPassword2').value;
//     }
// }
