import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogAddUserPromptComponent } from 'src/app/shared/components/dialog-add-user-prompt/dialog-add-user-prompt.component';
import { DialogEditUserPromptComponent } from 'src/app/shared/components/dialog-edit-user-prompt/dialog-edit-user-prompt.component';
import { DialogDeleteUserPromptComponent } from 'src/app/shared/components/dialog-delete-user-prompt/dialog-delete-user-prompt.component';
import { SmartTableService } from 'src/app/shared/services/smart-table.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="fas fa-plus"></i>',
      createButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
    },
    edit: {
      editButtonContent: '<i class="fas fa-pencil-alt"></i>',
      saveButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="fas fa-trash-alt"></i>',
      confirmDelete: true,
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
      isCGIAR: {
        title: 'Is CGIAR',
        type: 'string',
        width: '11%',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      lastLogin: {
        title: 'Last Login',
        type: 'string'
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private service: SmartTableService, private dialogService: NbDialogService) {
    this.data = this.service.getData();
    this.source.load(this.data);
  }

  ngOnInit(): void {
  }

  addUser() {
    this.openAddUser(DialogAddUserPromptComponent, this.data);
  }

  editUser(event: any) {
    this.openEditUser(DialogEditUserPromptComponent, event.data);
  }

  deleteUser(event: any) {
    this.openDeleteUser(DialogDeleteUserPromptComponent, event.data);
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
        isCGIAR: data.isCGIAR,
        email: data.email,
        password: data.password
      }
    }).onClose.subscribe(info => this.source.update(data, info));
  }

  openDeleteUser(dialog: any, data: any) {
    this.dialogService.open(dialog).onClose.subscribe(info => this.source.remove(data));
  }

}
