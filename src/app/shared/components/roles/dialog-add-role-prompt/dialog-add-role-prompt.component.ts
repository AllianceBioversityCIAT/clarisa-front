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
  active: string = 'Yes';
  cgiarEntity: string = '';
  list: any[] = [];
  roleAlreadyExists: boolean = false;
  roleSuccesfullyAdded: boolean = false;

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private roleService: RoleService) {
    this.addRoleForm = this.createAddRoleForm();
    this.addRoleForm.controls['active'].setValue(this.active);
    this.loadCGIAREntities();
  }

  ngOnInit(): void {
  }

  get form() { return this.addRoleForm.controls; }

  createAddRoleForm(): FormGroup {
    return this.formBuilder.group(
      {
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
        active: [
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        globalUnit: [
          null,
          Validators.compose([
            Validators.required
          ])
        ]
      }
    );
  }

  loadCGIAREntities() {
    this.roleService.getGlobalUnits().subscribe(x => {
      this.list = x;
      this.cgiarEntity = this.list[0].id;
      this.addRoleForm.controls['globalUnit'].setValue(this.cgiarEntity);
    });
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

  submit(description: any, acronym: any, active: any, globalUnit: any) {
    this.submitted = true;
    // this.findRole(acronym, globalUnit);



    if (this.addRoleForm.valid && !this.roleAlreadyExists) {
      this.roleInfo = {
        description: description,
        acronym: acronym,
        active: active == 'Yes' ? true : false,
        globalUnit: {
          id: globalUnit,
        }
      };

      this.roleService.postRole(this.roleInfo).subscribe(x => {
        this.roleSuccesfullyAdded = true;
        setTimeout(() => {
          this.roleSuccesfullyAdded = false;
          this.ref.close(x);
        }, 3000);
      });
    }
  }

  findRole(acronym: any, globalUnit: any) {
    this.roleService.getRoleByAcronymCGIAREntity(acronym, globalUnit).subscribe(x => {
      console.log(x.acronym, x.globalUnit)
      console.log(x)
      // if (condition) {

      // }
    });
  }

  cancel() {
    this.ref.close();
  }
}
