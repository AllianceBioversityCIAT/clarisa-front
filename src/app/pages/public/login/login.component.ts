import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted: boolean = false;
  userDoesNotExist: boolean = false;
  incorrectPassword: boolean = false;

  constructor(private router: Router, private formBuilder: FormBuilder, private authenticationService: AuthService) {
    this.loginForm = this.createLoginForm();
  }

  ngOnInit(): void {
  }

  get form() { return this.loginForm.controls; }

  createLoginForm(): FormGroup {
    return this.formBuilder.group(
      {
        signInEmail: [
          null,
          Validators.compose([
            Validators.email,
            Validators.required
          ])
        ],
        signInPassword: [
          null,
          Validators.compose([
            Validators.required
          ])
        ]
      }
    );
  }

  doLogin() {
    let email = this.loginForm.controls['signInEmail'].value;
    const password = this.loginForm.controls['signInPassword'].value;

    this.submitted = true;

    if (this.loginForm.valid) {
      this.authenticationService.loginAD(email, password).subscribe(
        {
          next: (res) => {
            if (res.authenticated === true) {
              this.router.navigate(['/home/users']);
            }
          }, 
          error: (error) => {
            console.log('doLogin', error);
            if (error.status == 403) {
              this.userDoesNotExist = false;
              this.incorrectPassword = true;
            } else if (error.status == 404) {
              this.userDoesNotExist = true;
              this.incorrectPassword = false;
            }
          }
        }
      );
    }
  }

  validateField(controlName: string): string {
    let control = this.loginForm.controls[controlName];
    if (this.submitted && control.invalid) {
      return 'danger';
    } if (this.submitted && !control.invalid) {
      return 'success';
    } else {
      return 'basic';
    }
  }

}
