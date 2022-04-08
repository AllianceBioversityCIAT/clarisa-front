import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { RoleService } from '../../../services/role.service';

@Component({
  selector: 'app-dialog-delete-role-prompt',
  templateUrl: './dialog-delete-role-prompt.component.html',
  styleUrls: ['./dialog-delete-role-prompt.component.scss']
})
export class DialogDeleteRolePromptComponent implements OnInit {
  @Input() data: any;
  description: string = '';
  roleDeleted: boolean = false;

  constructor(@Optional() protected ref: NbDialogRef<any>, private roleService: RoleService) { }

  ngOnInit(): void {
    this.description = this.data.description;
  }

  submit() {
    this.roleService.deleteRole(this.data).subscribe(x => {
      this.roleDeleted = true;
      setTimeout(() => {
        this.roleDeleted = false;
        this.ref.close(x);
      }, 3000);
    })
  }

  cancel() {
    this.ref.close();
  }
}
