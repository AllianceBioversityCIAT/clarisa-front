import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../helpers/custom-validators';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-reset-admin-password',
  templateUrl: './reset-admin-password.component.html',
  styleUrls: ['./reset-admin-password.component.scss']
})
export class ResetAdminPasswordComponent implements OnInit {
  resetAdminPasswordForm: FormGroup;
  submitted: boolean = false;
  passwordsDontMatch: boolean = false;
  passwordChanged: boolean = false;
  userInfo: object = {};

  constructor(private router: Router, private formBuilder: FormBuilder, private userService: UserService) { 
    this.resetAdminPasswordForm = this.createResetAdminPasswordForm();
  }

  ngOnInit(): void {
  }

  get form() { return this.resetAdminPasswordForm.controls; }

  createResetAdminPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        email: [
          null,
          Validators.compose([
            Validators.required,
            Validators.email
          ])
        ],
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
    let control = this.resetAdminPasswordForm.controls[controlName];
    if (this.submitted && control.invalid) {
      return 'danger';
    } if (this.submitted && !control.invalid) {
      return 'success';
    } else {
      return 'basic';
    }
  }

  submit(email: any, newPassword: any) {
    this.submitted = true;

    if (this.resetAdminPasswordForm.valid) {
      this.passwordsDontMatch = false;

      this.userInfo = {
        username: email,
        newPassword: newPassword
      }

      this.userService.forgotPassword(this.userInfo).subscribe(x => {
        this.passwordChanged = true;
        setTimeout(() => {
          this.passwordChanged = false;
        }, 3000);
      });
    } else {
      this.passwordsDontMatch = true;
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
