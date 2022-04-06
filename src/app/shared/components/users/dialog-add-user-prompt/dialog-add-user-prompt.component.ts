import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dialog-add-user-prompt',
  templateUrl: './dialog-add-user-prompt.component.html',
  styleUrls: ['./dialog-add-user-prompt.component.scss']
})
export class DialogAddUserPromptComponent implements OnInit {
  @Input() data: any;
  addUserForm: FormGroup;
  submitted: boolean = false;
  userInfo: object = {};
  cgiarUser: string = 'Yes';
  showField: boolean = false;
  disableField: boolean = true;
  showPasswordField: boolean = false;
  showPassword: boolean = true;
  searchUser: boolean = false;
  userAlreadyExists: boolean = false;
  userSuccesfullyAdded: boolean = false;
  
  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private userService: UserService) {
    this.addUserForm = this.createAddUserForm();
    this.addUserForm.controls['cgiarUser'].setValue(this.cgiarUser);
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
  
  submit(firstName: any, lastName: any, username: any, cgiarUser: any, email: any, password?: any) {
    this.submitted = true;

    if (this.addUserForm.valid && !this.userAlreadyExists) {
      this.userInfo = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        cgiarUser: cgiarUser == 'Yes' ? true : false,
        email: email,
        password: password
      };

      this.userService.postUser(this.userInfo).subscribe(x => {
        this.userSuccesfullyAdded = true;
        setTimeout(() => {
          this.userSuccesfullyAdded = false;
          this.ref.close(x);
        }, 3000)
      });
    }
  }

  onSelectChange(event: any) {
    if (event == 'Yes') {
      this.showPasswordField = false;
      this.disableField = true;
    } else {
      this.disableField = false;
      this.showPasswordField = true;
    }

    this.addUserForm.controls['password'].clearValidators();

    if(this.showPasswordField){
      this.addUserForm.controls['password'].addValidators(Validators.required);
    } 

    this.addUserForm.controls['password'].updateValueAndValidity();
  }

  loadUserInfo() {
    this.searchUser = true;
    let email = this.addUserForm.controls['email'].value;

    this.userService.getUserByEmail(email).subscribe(x => {
      if (x[0]) {
        if (x[0].id && x[0].id != null) {
          this.userAlreadyExists = true;
          this.addUserForm.controls['username'].setValue(x[0].username);
          this.addUserForm.controls['firstName'].setValue(x[0].firstName);
          this.addUserForm.controls['lastName'].setValue(x[0].lastName);
        } 
      } else {
        this.userAlreadyExists = false;
        this.addUserForm.controls['username'].reset();
        this.addUserForm.controls['firstName'].reset();
        this.addUserForm.controls['lastName'].reset();
      }
    });

    this.showField = true;
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
