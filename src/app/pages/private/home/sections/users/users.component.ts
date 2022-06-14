import { Component, OnInit, Optional } from '@angular/core';
import { NbDialogRef, NbDialogService, NbTabsetModule } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from 'src/app/shared/services/user.service';
import { DialogAddUserPromptComponent } from 'src/app/shared/components/users/dialog-add-user-prompt/dialog-add-user-prompt.component';
import { DialogEditUserPromptComponent } from 'src/app/shared/components/users/dialog-edit-user-prompt/dialog-edit-user-prompt.component';
import { DialogDeleteUserPromptComponent } from 'src/app/shared/components/users/dialog-delete-user-prompt/dialog-delete-user-prompt.component';
import { DialogResetPasswordPromptComponent } from 'src/app/shared/components/users/dialog-reset-password-prompt/dialog-reset-password-prompt.component';
import { DialogUserPermissionsPromptComponent } from 'src/app/shared/components/users/dialog-user-permissions-prompt/dialog-user-permissions-prompt.component';
import { EventBusService } from 'src/app/shared/services/even-bus.service';
import { EventData } from 'src/app/shared/interfaces/EventData';
import { Confirmation } from 'src/app/shared/interfaces/Confirmation';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
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
          name: 'password',
          title: '<i class="fas fa-key"></i>'
        },
        {
          name: 'delete',
          title: '<i class="fas fa-trash-alt"></i>'
        },
        {
          name: 'permissions',
          title: '<i class="fas fa-user-lock"></i>'
        }
      ],
    },
    rowClassFunction: (row: any) => {
      var isCgiarUser = row.data.cgiarUser;
      if (!isCgiarUser) {
        return '';
      } else {
        return 'hide-action';
      }
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '5%',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      cgiarUser: {
        title: 'Is CGIAR',
        type: 'string',
        width: '11%',
        valuePrepareFunction: (value: any) => {
          return value? 'Yes':'No';
        },
      },
      email: {
        title: 'Email',
        type: 'string',
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
        }
      ],
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        width: '5%',
      },
      firstName: {
        title: 'First Name',
        type: 'string',
      },
      lastName: {
        title: 'Last Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      cgiarUser: {
        title: 'Is CGIAR',
        type: 'string',
        width: '11%',
        valuePrepareFunction: (value: any) => {
          return value? 'Yes':'No';
        },
      },
      email: {
        title: 'Email',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  sourceDeactive: LocalDataSource = new LocalDataSource();
  data: any;
  userUpdated: boolean = false;
  sort = [{
    field: "id",
    direction: "asc"
  }]


  constructor(
    private dialogService: NbDialogService, 
    private userService: UserService,
    private eventBusService: EventBusService,
    @Optional() protected ref: NbDialogRef<any>
    ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next : (x) => {
        this.source.load(x.filter((f:any)=> f.active === true));
        this.sourceDeactive.load(x.filter((f:any)=> f.active === false));
      },
      error : (err) => {
        //console.log(err.error.message || err.error || err.message);
        if(err.status === 403){
          this.eventBusService.emit(new EventData('logout', null));
        }
      }
    });
  }

  addUser() {
    this.openAddUser(DialogAddUserPromptComponent, this.data);
  }

  onCustom(event: any, table:boolean) {
    let action = event['action'];

    switch (action) {
      case 'edit':
        this.editUser(event, table);
        break;
      case 'password':
        this.userPassword(event);
        break;
      case 'delete':
        this.deleteUser(event);
        break;
      case 'permissions':
        this.userPermissions(event);
        break;
      case 'active':
      this.userActive(event);  
        break;

      default:
        break;
    }
  }

  editUser(event: any, table: boolean) {
    this.openEditUser(DialogEditUserPromptComponent, event.data, table);
  }

  userPassword(event: any) {
    this.openUserPassword(DialogResetPasswordPromptComponent, event.data);
  }

  deleteUser(event: any) {
    this.openDeleteUser(DialogDeleteUserPromptComponent, event.data);
  }

  userPermissions(event: any) {
    this.openUserPermissions(DialogUserPermissionsPromptComponent, event.data);
  }

  userActive(event: any){
    this.openActiveUser(event.data);
  }

  openAddUser(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => this.source.add(info));
    
  }

  openEditUser(dialog: any, data: any, table: boolean) {
    this.dialogService.open(dialog, {
      context: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        cgiarUser: data.cgiarUser,
        email: data.email,
        password: data.password,
        isActive: data.isActive,
      }
    }).onClose.subscribe(info =>{
      if(table === true){
        this.source.update(data, info);
      }else{
        this.sourceDeactive.update(data,info);
      }
    } 
    );
      
  }

  openUserPassword(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        email: data.email
      }
    }).onClose.subscribe(info => this.source.update(data, info));
  }

  openDeleteUser(dialog: any, data: any) {
    
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info =>  {
      if(info != null){
        this.source.remove(data);
        this.sourceDeactive.add(data);
        this.sourceDeactive.setSort(this.sort);
        this.sourceDeactive.refresh();
      }
    } );
    
  }

  openUserPermissions(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        user: data,
      }
    });
  }

  openActiveUser(datas:any){
    let data: Confirmation = {body: "Are you sure you want to active?"};
    let dialogRef : NbDialogRef<ConfirmationDialogComponent> = this.dialogService.open(ConfirmationDialogComponent, {context: {data}});
    let datos = {
      id: datas.id,
      firstName: datas.firstName,
      lastName: datas.lastName,
      username: datas.username,
      cgiarUser: datas.cgiarUser == 'Yes' ? true : false,
      email: datas.email,
      active: !datas.active,
    };
    dialogRef.onClose.subscribe(result => {
      if(result){
        this.userService.updateActiveUser(datos).subscribe({
          next:(x) => {
            this.userUpdated = true;
            setTimeout(() => {
              this.userUpdated = false;
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
