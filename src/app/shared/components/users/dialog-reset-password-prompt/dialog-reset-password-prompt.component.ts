import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { CustomValidators } from '../../../helpers/custom-validators';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dialog-reset-password-prompt',
  templateUrl: './dialog-reset-password-prompt.component.html',
  styleUrls: ['./dialog-reset-password-prompt.component.scss']
})
export class DialogResetPasswordPromptComponent implements OnInit {
  @Input() email: any;
  resetPasswordForm: FormGroup;
  passwordsDontMatch: boolean = false;
  passwordChanged: boolean = false;
  submitted: boolean = false;
  userInfo: object = {};

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private userService: UserService) {
    this.resetPasswordForm = this.createResetPasswordForm();
  }

  ngOnInit(): void {
  }

  get form() { return this.resetPasswordForm.controls; }

  createResetPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        newPassword: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        confirmPassword: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
      },
      {
        validator: CustomValidators.passwordMatchValidator
      }
    );
  }

  validateField(controlName: string): string {
    let control = this.resetPasswordForm.controls[controlName];
    if (this.submitted && control.invalid) {
      return 'danger';
    } if (this.submitted && !control.invalid) {
      return 'success';
    } else {
      return 'basic';
    }
  }

  submit(newPassword: any) {
    this.submitted = true;

    if (this.resetPasswordForm.valid) {
      this.passwordsDontMatch = false;

      this.userInfo = {
        username: this.email,
        newPassword: newPassword
      }

      this.userService.changeUserPassword(this.userInfo).subscribe(x => {
        this.passwordChanged = true;
        setTimeout(() => {
          this.passwordChanged = false;
          this.ref.close(x);
        }, 3000)
      })
    } else {
      this.passwordsDontMatch = true;
    }
  }

  cancel() {
    this.ref.close();
  }
}