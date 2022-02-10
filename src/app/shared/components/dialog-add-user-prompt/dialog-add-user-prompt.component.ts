import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-add-user-prompt',
  templateUrl: './dialog-add-user-prompt.component.html',
  styleUrls: ['./dialog-add-user-prompt.component.scss']
})
export class DialogAddUserPromptComponent implements OnInit {
  @Input() data: any;
  addUserForm: FormGroup;
  submitted: boolean = false;
  id: number = 0;
  userInfo: object = {};
  isCGIAR: string = 'No';
  showPasswordField: boolean = true;
  showPassword: boolean = true;
  
  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder) {
    this.addUserForm = this.createAddUserForm();
    this.addUserForm.controls['isCGIAR'].setValue(this.isCGIAR);
   }

  ngOnInit(): void {
  }

  get form() { return this.addUserForm.controls; }

  createAddUserForm(): FormGroup {
    return this.formBuilder.group(
      {
        firstName: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        lastName: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        username: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        isCGIAR: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        email: [
          null,
          Validators.compose([
            Validators.email,
            Validators.required
          ])
        ],
        password: [
          null,
          Validators.compose([
            (this.showPasswordField) ? Validators.required : null
          ])
        ]
      }
    );
  }

  validateField(controlName: string): string {
    let control = this.addUserForm.controls[controlName];
    if (this.submitted && control.invalid) {
      return 'danger';
    } if (this.submitted && !control.invalid) { 
      return 'success';
    } else {
      return 'basic';
    }
  }
  
  submit(firstName: any, lastName: any, username: any, isCGIAR: any, email: any, password?: any) {
    this.submitted = true;

    if (this.addUserForm.valid) {
      this.userInfo = {
        id: this.data.length+1,
        firstName: firstName,
        lastName: lastName,
        username: username,
        isCGIAR: isCGIAR,
        email: email,
        password: password
      };

      this.ref.close(this.userInfo);
    }
  }

  onSelectChange(event: any) {
    if (event == 'Yes') {
      this.showPasswordField = false;
    } else {
      this.showPasswordField = true;
    }

    this.addUserForm.controls['password'].clearValidators();

    if(this.showPasswordField){
      this.addUserForm.controls['password'].addValidators(Validators.required);
    } 

    this.addUserForm.controls['password'].updateValueAndValidity();
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  cancel() {
    this.ref.close();
  }
}
