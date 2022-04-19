import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { InstitutionService } from 'src/app/shared/services/institution.service';
import { DialogAddInstitutionPromptComponent } from 'src/app/shared/components/institutions/dialog-add-institution-prompt/dialog-add-institution-prompt.component';
import { LocElement } from 'src/app/shared/interfaces/LocElement';
import { InstitutionLocation } from 'src/app/shared/interfaces/InstitutionLocation';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutions.component.html', 
  styleUrls: ['./institutions.component.scss']
})
export class InstitutionsComponent implements OnInit {  
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="fas fa-plus"></i>',
      createButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
    },
    actions: {
      edit: false,
      delete: false,
      custom: [
        {
          name: 'edit',
          title: '<i class="fas fa-pencil-alt"></i>'
        },       
        {
          name: 'delete',
          title: '<i class="fas fa-trash-alt"></i>'
        },        
      ],
    },
    columns: {
       id: {
         title: 'ID',
         type: 'number',
         width: '5%',
       },
       name: {
         title: 'Name',
         type: 'string',
       },
       acronym: {
         title: 'Acronym',
         type: 'string',
       },
       websiteLink: {
         title: 'Website',
         type: 'string',
       },
       locations: {
         title: 'Locations',
         type: 'html',
         valuePrepareFunction: (value: any[]) => {
           
           let dataInfo='<div class="displayFlags" >'
           for(let data of value){
           
            dataInfo+= `<span data-toggle="tooltip" title="${data.location.name}" class="flag-icon flag-icon-${data.location.isoAlpha2.toLowerCase()} sizeFlags"
            style="padding: 0 15px;"></span>`                        
           }
          return dataInfo+'</div>';
        }        
       },
       institutionType: {
         title: 'Institution Type',
         type: 'string',
         valuePrepareFunction: (value: any) => {
          return value.name;
        }         
       },
     }
  };
  source: LocalDataSource = new LocalDataSource();
  data: any;
  loading = false;

  constructor(private dialogService: NbDialogService, private institutionService: InstitutionService) { }

  ngOnInit(): void {
    this.loading = true;
    this.institutionService.getInstitution().subscribe(x => {
      this.source.load(x);
      this.loading = false;
    });
   
  }

  addInstitution() {
    this.openAddInstitution(DialogAddInstitutionPromptComponent, this.data);
  }
  
  openAddInstitution(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => this.source.add(info));
  }

  onCustom(event: any) {
    let action = event['action'];
  }
}
