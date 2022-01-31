import { Component, Input, OnInit, Optional, ViewChild } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-edit-user-prompt',
  templateUrl: './dialog-edit-user-prompt.component.html',
  styleUrls: ['./dialog-edit-user-prompt.component.scss']
})
export class DialogEditUserPromptComponent implements OnInit {
  @Input() id: string = '';
  @Input() firstName: string = '';
  @Input() lastName: string = '';
  @Input() username: string = '';
  @Input() email: string = '';
  userInfo: object = {};

  constructor(@Optional() protected ref: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  submit(firstName: any, lastName: any, username: any, email: any) {
    this.userInfo = {
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email
    };

    this.ref.close(this.userInfo);
  }

  cancel() {
    this.ref.close();
  }
}
