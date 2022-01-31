import { Component, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-delete-user-prompt',
  templateUrl: './dialog-delete-user-prompt.component.html',
  styleUrls: ['./dialog-delete-user-prompt.component.scss']
})
export class DialogDeleteUserPromptComponent implements OnInit {
  
  constructor(@Optional() protected ref: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  submit() {
    this.ref.close();
  }

  cancel() {
    this.ref.close();
  }

}
