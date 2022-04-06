import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dialog-delete-user-prompt',
  templateUrl: './dialog-delete-user-prompt.component.html',
  styleUrls: ['./dialog-delete-user-prompt.component.scss']
})
export class DialogDeleteUserPromptComponent implements OnInit {
  @Input() data: any;
  email: string = '';
  userDeleted: boolean = false;
  
  constructor(@Optional() protected ref: NbDialogRef<any>, private userService: UserService) { }

  ngOnInit(): void {
    this.email = this.data.email;
  }

  submit() {
    this.userService.deleteUser(this.data).subscribe(x => {
      this.userDeleted = true;
      setTimeout(() => {
        this.userDeleted = false;
        this.ref.close(x);
      }, 3000);
    })
  }

  cancel() {
    this.ref.close();
  }

}
