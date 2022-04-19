import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function notCustomValueValidator(value: any) : ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        return control.value === value ? {wrongValue : control.value} : null;
    }
}