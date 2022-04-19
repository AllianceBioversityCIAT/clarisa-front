import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { InstitutionService } from 'src/app/shared/services/institution.service';


@Component({
  selector: 'app-dialog-delete-institution-prompt',
  templateUrl: './dialog-delete-institution-prompt.component.html',
  styleUrls: ['./dialog-delete-institution-prompt.component.scss']
})
export class DialogDeleteInstitutionPromptComponent implements OnInit {
  @Input() data: any;
  description: string = '';
  institutionDeleted: boolean = false;

  constructor(@Optional() protected ref: NbDialogRef<any>, private institutionService: InstitutionService) { }

  ngOnInit(): void {
    this.description = this.data.name;
  }

  submit() {
    this.institutionService.deleteInstitution(this.data).subscribe(x => {
      this.institutionDeleted = true;
      setTimeout(() => {
        this.institutionDeleted = false;
        this.ref.close(x);
      }, 3000);
    })
  }

  cancel() {
    this.ref.close();
  }
}
