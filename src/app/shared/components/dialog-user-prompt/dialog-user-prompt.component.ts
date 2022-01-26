import { Component, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'app-dialog-user-prompt',
  templateUrl: './dialog-user-prompt.component.html',
  styleUrls: ['./dialog-user-prompt.component.scss']
})
export class DialogUserPromptComponent implements OnInit {

  constructor(@Optional() protected ref: NbDialogRef<any>) { }

  ngOnInit(): void {
  }

  cancel() {
    this.ref.close();
  }

}
