import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogAddRolePromptComponent } from 'src/app/shared/components/roles/dialog-add-role-prompt/dialog-add-role-prompt.component';
import { DialogDeleteRolePromptComponent } from 'src/app/shared/components/roles/dialog-delete-role-prompt/dialog-delete-role-prompt.component';
import { DialogEditRolePromptComponent } from 'src/app/shared/components/roles/dialog-edit-role-prompt/dialog-edit-role-prompt.component';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="fas fa-plus"></i>',
      createButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
    },
    actions: {
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="fas fa-pencil-alt"></i>'
        },
        {
          name: 'delete',
          title: '<i class="fas fa-trash-alt"></i>'
        },
      ],
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '5%'
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      acronym: {
        title: 'Acronym',
        type: 'string',
      },
      active: {
        title: 'Is Active',
        type: 'string',
        width: '10%',
        valuePrepareFunction: (value: any) => {
          return value ? 'Yes' : 'No';
        },
      },
      globalUnit: {
        title: 'CGIAR Entity',
        type: 'string',
        valuePrepareFunction: (value: any) => {
          return value.acronym;
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private dialogService: NbDialogService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(x => {
      this.source.load(x);
    });
  }

  addRole() {
    this.openAddRole(DialogAddRolePromptComponent, this.data);
  }

  onCustom(event: any) {
    let action = event['action'];

    switch (action) {
      case 'edit':
        this.editRole(event);
        break;
      case 'delete':
        this.deleteRole(event);
        break;

      default:
        break;
    }
  }

  editRole(event: any) {
    this.openEditRole(DialogEditRolePromptComponent, event.data);
  }

  deleteRole(event: any) {
    this.openDeleteRole(DialogDeleteRolePromptComponent, event.data);
  }

  openAddRole(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => this.source.add(info));
  }

  openEditRole(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        id: data.id,
        description: data.description,
        acronym: data.acronym,
        active: data.active,
        globalUnit: data.globalUnit.id,
      }
    }).onClose.subscribe(info => this.source.update(data, info));
  }

  openDeleteRole(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => info != undefined ? this.source.remove(data) : null);
  }

}
