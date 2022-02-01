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
  @Input() email: string = '';
  editUserForm: FormGroup;
  submitted: boolean = false;
  userInfo: object = {};

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder) {
    this.editUserForm = this.createEditUserForm();
  }
  
  ngOnInit(): void {
    this.loadUserInfo();
  }

  get form() { return this.editUserForm.controls; }

  createEditUserForm(): FormGroup {
    return this.formBuilder.group(
      {
        id: [
          {
            value: '',
            disabled: true
          },
          Validators.compose([
            Validators.required
          ])
        ],
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
        email: [
          null,
          Validators.compose([
            Validators.email,
            Validators.required
          ])
        ]
      }
    );
  }

  loadUserInfo() {
    this.editUserForm.controls['id'].setValue(this.id);
    this.editUserForm.controls['firstName'].setValue(this.firstName);
    this.editUserForm.controls['lastName'].setValue(this.lastName);
    this.editUserForm.controls['username'].setValue(this.username);
    this.editUserForm.controls['email'].setValue(this.email);
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

  submit(firstName: any, lastName: any, username: any, email: any) {
    this.submitted = true;

    if (this.editUserForm.valid) {
      this.userInfo = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email
      };

      this.ref.close(this.userInfo);
    }
  }

  cancel() {
    this.ref.close();
  }
}
