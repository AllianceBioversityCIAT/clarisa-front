import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-edit-user-prompt',
  templateUrl: './dialog-edit-user-prompt.component.html',
  styleUrls: ['./dialog-edit-user-prompt.component.scss']
})
export class DialogEditUserPromptComponent implements OnInit {
  @Input() id: number = 0;
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() username: string = '';
  @Input() isCGIAR: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  editUserForm!: FormGroup;
  submitted: boolean = false;
  userInfo: object = {};
  showPasswordField: boolean = false;
  showPassword: boolean = false;

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.showPasswordField = (this.isCGIAR == 'Yes') ? false : true;
    this.editUserForm = this.createEditUserForm();
    this.loadUserInfo();
  }

  get form() { return this.editUserForm.controls; }

  createEditUserForm(): FormGroup {
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

  loadUserInfo() {
    this.editUserForm.controls['firstName'].setValue(this.firstName);
    this.editUserForm.controls['lastName'].setValue(this.lastName);
    this.editUserForm.controls['username'].setValue(this.username);
    if (this.isCGIAR && this.isCGIAR != undefined) {
      this.editUserForm.controls['isCGIAR'].setValue(this.isCGIAR);
    } else {
      this.editUserForm.controls['isCGIAR'].setValue('No');
      this.showPasswordField = true;
    }
    this.editUserForm.controls['email'].setValue(this.email);
    this.editUserForm.controls['password'].setValue(this.password);
  }

  validateField(controlName: string): string {
    let control = this.editUserForm.controls[controlName];
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

    if (this.editUserForm.valid) {
      this.userInfo = {
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

    this.editUserForm.controls['password'].clearValidators();

    if(this.showPasswordField){
      this.editUserForm.controls['password'].addValidators(Validators.required);
    } 

    this.editUserForm.controls['password'].updateValueAndValidity();
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
