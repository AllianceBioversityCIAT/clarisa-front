import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-dialog-add-role-prompt',
  templateUrl: './dialog-add-role-prompt.component.html',
  styleUrls: ['./dialog-add-role-prompt.component.scss']
})
export class DialogAddRolePromptComponent implements OnInit {
  @Input() data: any;
  addRoleForm: FormGroup;
  submitted: boolean = false;
  roleInfo: object = {};
  isActive: string = 'Yes';
  roleAlreadyExists: boolean = false;
  roleSuccesfullyAdded: boolean = false;

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private roleService: RoleService) {
    this.addRoleForm = this.createAddRoleForm();
    this.addRoleForm.controls['isActive'].setValue(this.isActive);
  }

  ngOnInit(): void {
  }

  get form() { return this.addRoleForm.controls; }

  createAddRoleForm(): FormGroup {
    return this.formBuilder.group(
      {
        name: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        description: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        acronym: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        isActive: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        cgiarEntity: [
          null,
          Validators.compose([
            Validators.required
          ])
        ]
      }
    );
  }

  validateField(controlName: string): string {
    let control = this.addRoleForm.controls[controlName];
    if (this.submitted && control.invalid) {
      return 'danger';
    } if (this.submitted && !control.invalid) {
      return 'success';
    } else {
      return 'basic';
    }
  }

  submit(name: any, description: any, acronym: any, isActive: any, cgiarEntity: any) {
    this.submitted = true;

    if (this.addRoleForm.valid) {
      this.roleInfo = {
        name: name,
        description: description,
        acronym: acronym,
        isActive: isActive == 'Yes' ? true : false,
        cgiarEntity: cgiarEntity,
      };

      this.roleService.updateRole(this.roleInfo).subscribe(x => {
        this.roleSuccesfullyAdded = true;
        setTimeout(() => {
          this.roleSuccesfullyAdded = false;
          this.ref.close(x);
        }, 3000);
      })
    }
  }

  cancel() {
    this.ref.close();
  }
}
