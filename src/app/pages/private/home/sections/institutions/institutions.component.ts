import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { InstitutionService } from 'src/app/shared/services/institution.service';
import { DialogAddInstitutionPromptComponent } from 'src/app/shared/components/institutions/dialog-add-institution-prompt/dialog-add-institution-prompt.component';
import { LocElement } from 'src/app/shared/interfaces/LocElement';
<<<<<<< HEAD
import { institutionLocation } from 'src/app/shared/interfaces/InstitutionLocation';
import { DialogEditInstitutionPromptComponent } from 'src/app/shared/components/institutions/dialog-edit-institution-prompt/dialog-edit-institution-prompt.component';
import { DialogDeleteInstitutionPromptComponent } from 'src/app/shared/components/institutions/dialog-delete-institution-prompt/dialog-delete-institution-prompt.component';

=======
import { InstitutionLocation } from 'src/app/shared/interfaces/InstitutionLocation';
>>>>>>> staging

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

  editInstitution(event: any){
    this.openEditInstitution(DialogEditInstitutionPromptComponent, event.data);
  }

  deleteInstitution(event: any){
    this.openDeleteInstitution(DialogDeleteInstitutionPromptComponent, event.data);
  }
  
  openAddInstitution(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => this.source.add(info));
  }
  openEditInstitution(dialog: any, data: any) {
    
    let locations:any[]=[];
    let location:any=null;
    for (let loc of data.locations ){
      if(loc.headquarter){
        location=loc;        
      }else{
        locations.push(loc.location);
      }
    }
   
    this.dialogService.open(dialog, {
      context: {
        id: data.id,
        name: data.name,
        acronym: data.acronym,
        website: data.websiteLink,
        type: data.institutionType.id,
        hq: location==null?null:location.location,
        locations:locations
      }      
    }).onClose.subscribe(info => this.source.update(data, info));
  }

  onCustom(event: any) {
    let action = event['action'];
    switch (action) {
      case 'edit':
        this.editInstitution(event);
        break;
      case 'delete':
        this.deleteInstitution(event);
        break;

      default:
        break;
    }
  }
  openDeleteInstitution(dialog: any, data: any) {
    this.dialogService.open(dialog, {
      context: {
        data: data
      }
    }).onClose.subscribe(info => info != undefined ? this.source.remove(data) : null);
  }
}
