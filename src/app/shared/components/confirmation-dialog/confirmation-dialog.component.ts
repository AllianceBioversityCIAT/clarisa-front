import { Component, Input, OnInit, Optional } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Confirmation } from '../../interfaces/Confirmation';

@Component({
  selector: 'app-confirmation-dialog.component',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
    @Input() public data!: Confirmation;

    constructor(@Optional() protected ref: NbDialogRef<any>){}

    ngOnInit(): void { }

    public accept(){
        this.close(true);
    }

    public cancel(){
        this.close(false);
    }

    private close(result: boolean){
        this.ref.close(result);
    }
}