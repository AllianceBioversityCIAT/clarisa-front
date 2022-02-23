import { AbstractControl } from "@angular/forms";

export class CustomValidators {
    static passwordMatchValidator(control: AbstractControl) {
        const newPassword: string = control.get('newPassword')!.value;
        const confirmPassword: string = control.get('confirmPassword')!.value;

        if (newPassword !== confirmPassword) {
            control.get('newPassword')!.setErrors({ NoPasswordMatch: true});
            control.get('confirmPassword')!.setErrors({ NoPasswordMatch: true});
        } else {
            control.get('newPassword')!.setErrors(null);
            control.get('confirmPassword')!.setErrors(null);
        }
    }
}