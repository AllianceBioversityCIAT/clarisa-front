import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../../services/user.service';

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
  @Input() cgiarUser: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  editUserForm!: FormGroup;
  submitted: boolean = false;
  userUpdated: boolean = false;
  userInfo: object = {};

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private userService: UserService) { }
  
  ngOnInit(): void {
    this.editUserForm = this.createEditUserForm();
    this.cgiarUser = this.cgiarUser ? 'Yes' : 'No';
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
        cgiarUser: [
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
    this.editUserForm.controls['firstName'].setValue(this.firstName);
    this.editUserForm.controls['lastName'].setValue(this.lastName);
    this.editUserForm.controls['username'].setValue(this.username);
    
    if (this.cgiarUser && this.cgiarUser != undefined) {
      this.editUserForm.controls['cgiarUser'].setValue(this.cgiarUser);
    } else {
      this.editUserForm.controls['cgiarUser'].setValue('No');
    }

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

  submit(firstName: any, lastName: any, username: any, cgiarUser: any, email: any) {
    this.submitted = true;

    if (this.editUserForm.valid) {
      this.userInfo = {
        id: this.id,
        firstName: firstName,
        lastName: lastName,
        username: username,
        cgiarUser: cgiarUser == 'Yes' ? true : false,
        email: email,
      };

      this.userService.updateUser(this.userInfo).subscribe(x => {
        this.userUpdated = true;
        setTimeout(() => {
          this.userUpdated = false;
          this.ref.close(x);
        }, 3000);
      })
    }
  }

  cancel() {
    this.ref.close();
  }
}
