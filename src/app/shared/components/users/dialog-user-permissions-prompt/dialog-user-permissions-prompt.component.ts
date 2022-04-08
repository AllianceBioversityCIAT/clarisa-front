import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-dialog-user-permissions-prompt',
  templateUrl: './dialog-user-permissions-prompt.component.html',
  styleUrls: ['./dialog-user-permissions-prompt.component.scss']
})
export class DialogUserPermissionsPromptComponent implements OnInit {
  @Input() email: string = '';

  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
  }

  close() {
    this.ref.close();
  }

}
