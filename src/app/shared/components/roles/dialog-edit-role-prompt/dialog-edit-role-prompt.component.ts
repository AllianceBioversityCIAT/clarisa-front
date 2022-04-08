import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-dialog-edit-role-prompt',
  templateUrl: './dialog-edit-role-prompt.component.html',
  styleUrls: ['./dialog-edit-role-prompt.component.scss']
})
export class DialogEditRolePromptComponent implements OnInit {
  @Input() id: number = 0;
  @Input() description: string = '';
  @Input() acronym: string = '';
  @Input() active: string = '';
  @Input() globalUnit: string = '';
  editRoleForm!: FormGroup;
  submitted: boolean = false;
  list: any[] = [];
  roleUpdated: boolean = false;
  roleInfo: object = {};

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private roleService: RoleService) { }

  ngOnInit(): void {
    this.editRoleForm = this.createEditRoleForm();
    this.active = this.active ? 'Yes' : 'No';
    this.loadCGIAREntities();
    this.loadRoleInfo();
  }

  get form() { return this.editRoleForm.controls; }

  createEditRoleForm(): FormGroup {
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
    });
  }

  loadRoleInfo() {
    this.editRoleForm.controls['description'].setValue(this.description);
    this.editRoleForm.controls['acronym'].setValue(this.acronym);
    
    if (this.active && this.active != undefined) {
      this.editRoleForm.controls['active'].setValue(this.active);
    } else {
      this.editRoleForm.controls['active'].setValue('No');
    }

    this.editRoleForm.controls['globalUnit'].setValue(this.globalUnit);
  }

  validateField(controlName: string): string {
    let control = this.editRoleForm.controls[controlName];
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

    if (this.editRoleForm.valid) {
      this.roleInfo = {
        id: this.id,
        description: description,
        acronym: acronym,
        active: active == 'Yes' ? true : false,
        globalUnit: {
          id: globalUnit,
        }
      };
      
      this.roleService.updateRole(this.roleInfo).subscribe(x => {
        this.roleUpdated = true;
        setTimeout(() => {
          this.roleUpdated = false;
          this.ref.close(x);
        }, 3000);
      })
    }
  }

  cancel() {
    this.ref.close();
  }

}
