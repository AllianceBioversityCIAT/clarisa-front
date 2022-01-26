import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private router: Router, private formBuilder: FormBuilder) {
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
            Validators.required,
            // Validators.minLength(6)
          ])
        ]
      }
    )
  }

  doLogin() {
    let email = this.loginForm.controls['signInEmail'].value;
    const password = this.loginForm.controls['signInPassword'].value;

    this.submitted = true;
    console.log(email, password);
    // this.router.navigate(['/home']);
  }

  validateField(controlName: string): string {
    let control = this.loginForm.controls[controlName];
    if (control.invalid && control.touched) {
      return 'danger';
    } if (!control.invalid && control.touched) { 
      return 'success';
    } else {
      return 'basic';
    }
  }

}
