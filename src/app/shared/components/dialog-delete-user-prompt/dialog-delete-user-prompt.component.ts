import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dialog-delete-user-prompt',
  templateUrl: './dialog-delete-user-prompt.component.html',
  styleUrls: ['./dialog-delete-user-prompt.component.scss']
})
export class DialogDeleteUserPromptComponent implements OnInit {
  @Input() data: any;
  
  constructor(@Optional() protected ref: NbDialogRef<any>, private userService: UserService) { }

  ngOnInit(): void {
  }

  submit() {
    this.userService.deleteUser(this.data).subscribe(x => {
      this.ref.close(x);
    })
  }

  cancel() {
    this.ref.close();
  }

}
