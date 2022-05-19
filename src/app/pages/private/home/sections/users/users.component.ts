import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from 'src/app/shared/services/user.service';
import { DialogAddUserPromptComponent } from 'src/app/shared/components/users/dialog-add-user-prompt/dialog-add-user-prompt.component';
import { DialogEditUserPromptComponent } from 'src/app/shared/components/users/dialog-edit-user-prompt/dialog-edit-user-prompt.component';
import { DialogDeleteUserPromptComponent } from 'src/app/shared/components/users/dialog-delete-user-prompt/dialog-delete-user-prompt.component';
import { DialogResetPasswordPromptComponent } from 'src/app/shared/components/users/dialog-reset-password-prompt/dialog-reset-password-prompt.component';
import { DialogUserPermissionsPromptComponent } from 'src/app/shared/components/users/dialog-user-permissions-prompt/dialog-user-permissions-prompt.component';
import { EventBusService } from 'src/app/shared/services/even-bus.service';
import { EventData } from 'src/app/shared/interfaces/EventData';

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
          return value ? 'Yes' : 'No';
        },
      },
      email: {
        title: 'Email',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(
    private dialogService: NbDialogService, 
    private userService: UserService,
    private eventBusService: EventBusService
    ) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next : (x) => {
        this.source.load(x);
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

  onCustom(event: any) {
    let action = event['action'];

    switch (action) {
      case 'edit':
        this.editUser(event);
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

      default:
        break;
    }
  }

  editUser(event: any) {
    this.openEditUser(DialogEditUserPromptComponent, event.data);
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

  openAddUser(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => this.source.add(info));
  }

  openEditUser(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        username: data.username,
        cgiarUser: data.cgiarUser,
        email: data.email,
        password: data.password
      }
    }).onClose.subscribe(info => this.source.update(data, info));
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
    }).onClose.subscribe(info => info != undefined ? this.source.remove(data) : null);
  }

  openUserPermissions(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        email: data.email,
      }
    });
  }

}
