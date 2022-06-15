import { Component, OnInit } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { DialogAddRolePromptComponent } from 'src/app/shared/components/roles/dialog-add-role-prompt/dialog-add-role-prompt.component';
import { DialogDeleteRolePromptComponent } from 'src/app/shared/components/roles/dialog-delete-role-prompt/dialog-delete-role-prompt.component';
import { DialogEditRolePromptComponent } from 'src/app/shared/components/roles/dialog-edit-role-prompt/dialog-edit-role-prompt.component';
import { Confirmation } from 'src/app/shared/interfaces/Confirmation';
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
      /*active: {
        title: 'Is Active',
        type: 'string',
        width: '10%',
        valuePrepareFunction: (value: any) => {
          return value ? 'Yes' : 'No';
        },
      },*/
      globalUnit: {
        title: 'CGIAR Entity',
        type: 'string',
        valuePrepareFunction: (value: any) => {
          return value.acronym;
        },
      },
    },
  };

  settingsDeactive = {
    mode: 'external',
    actions: {
      edit: false,
      delete: false,
      add:false,
      custom: [
        {
          name: 'edit',
          title: '<i class="fas fa-pencil-alt"></i>'
        },
        {
          name: 'active',
          title: '<i class="fas fa-check"></i>'
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
      /*active: {
        title: 'Is Active',
        type: 'string',
        width: '10%',
        valuePrepareFunction: (value: any) => {
          return value ? 'Yes' : 'No';
        },
      },*/
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
  sourceDeactive: LocalDataSource = new LocalDataSource();
  data: any;
  roleUpdated: boolean = false;
  sort = [{
    field: "id",
    direction: "asc"
  }]
  constructor(private dialogService: NbDialogService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.roleService.getRoles().subscribe(x => {
      this.source.load(x.filter((f:any)=> f.active === true));
        this.sourceDeactive.load(x.filter((f:any)=> f.active === false));
    });
  }

  addRole() {
    this.openAddRole(DialogAddRolePromptComponent, this.data);
  }

  onCustom(event: any, estado: boolean) {
    let action = event['action'];

    switch (action) {
      case 'edit':
        this.editRole(event, estado);
        break;
      case 'delete':
        this.deleteRole(event);
        break;
      case 'active':
        this.roleActive(event); 
        break;

      default:
        break;
    }
  }

  editRole(event: any, estado: boolean) {
    this.openEditRole(DialogEditRolePromptComponent, event.data, estado);
  }

  deleteRole(event: any) {
    this.openDeleteRole(DialogDeleteRolePromptComponent, event.data);
  }
  roleActive(event: any){
    this.openActiveRole(event.data);
  }

  openAddRole(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => this.source.add(info));
  }

  openEditRole(dialog: any, data: any, estado: boolean) {
    this.dialogService.open(dialog, {
      context: {
        id: data.id,
        description: data.description,
        acronym: data.acronym,
        active: data.active,
        globalUnit: data.globalUnit.id,
      }
    }).onClose.subscribe(info => {
      if(estado === true){
        this.source.update(data, info);
      }else{
        this.sourceDeactive.update(data,info);
      }
    } );
  }

  openDeleteRole(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => {
      if(info != null){
        this.source.remove(data);
        this.sourceDeactive.add(data);
        this.sourceDeactive.setSort(this.sort);
        this.sourceDeactive.refresh();
      }
    });
  }

  openActiveRole(datas:any){
    let data: Confirmation = {body: "Are you sure you want to activate this role?", title:{messages:"Active role: ",user:`${datas.description}`}};
    let dialogRef : NbDialogRef<ConfirmationDialogComponent> = this.dialogService.open(ConfirmationDialogComponent, {context: {data}});
    let roleInfo = {
      id: datas.id,
      description: datas.description,
      acronym: datas.acronym,
      active: !datas.active,
      globalUnit: {
        id: datas.globalUnit,
      }
    };
    dialogRef.onClose.subscribe(result => {
      if(result){
        this.roleService.updateRole
        (roleInfo).subscribe({
          next:(x) => {
            this.roleUpdated = true;
            setTimeout(() => {
              this.roleUpdated = false;
              //this.ref.close(x);
            }, 3000);
          },
          error: (err) => {
            console.log(err);
          }
        });
        this.source.add(datas);
        this.sourceDeactive.remove(datas);
        this.source.setSort(this.sort);
        this.source.refresh();
      }
    });
    
  }


}
