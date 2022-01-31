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
  id: string = '';
  userInfo: object = {};
  
  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder) {
    this.addUserForm = this.createAddUserForm();
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
  
  submit(firstName: any, lastName: any, username: any, email: any) {
    this.submitted = true;

    if (this.addUserForm.valid) {
      this.userInfo = {
        id: this.data.length+1,
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
