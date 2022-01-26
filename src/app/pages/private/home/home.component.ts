import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DialogDeleteUserPromptComponent } from 'src/app/shared/components/dialog-delete-user-prompt/dialog-delete-user-prompt.component';
import { DialogUserPromptComponent } from 'src/app/shared/components/dialog-user-prompt/dialog-user-prompt.component';
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
      email: {
        title: 'E-mail',
        type: 'string',
      }
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: SmartTableService, private dialogService: NbDialogService) {
    const data = this.service.getData();
    this.source.load(data);
  }

  ngOnInit(): void {
  }

  addUser(event: any) {
    this.open();
    console.log(event)
  }

  editUser(event: any) {
    console.log(event)
  }

  deleteUser(event: any) {
    this.dialogService.open(DialogDeleteUserPromptComponent);
    console.log(event)
  }

  open() {
    this.dialogService.open(DialogUserPromptComponent);
  }

}
