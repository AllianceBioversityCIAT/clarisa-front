import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { InstitutionService } from 'src/app/shared/services/institution.service';
import { DialogAddInstitutionPromptComponent } from 'src/app/shared/components/institutions/dialog-add-institution-prompt/dialog-add-institution-prompt.component';
import { LocElement } from 'src/app/shared/interfaces/LocElement';
import { DialogEditInstitutionPromptComponent } from 'src/app/shared/components/institutions/dialog-edit-institution-prompt/dialog-edit-institution-prompt.component';
import { DialogDeleteInstitutionPromptComponent } from 'src/app/shared/components/institutions/dialog-delete-institution-prompt/dialog-delete-institution-prompt.component';

import { InstitutionLocation } from 'src/app/shared/interfaces/InstitutionLocation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-institutions',
  templateUrl: './institutionsDuplicated.component.html', 
  styleUrls: ['./institutionsDuplicated.component.scss']
})
export class InstitutionsDuplicatedComponent implements OnInit {  
 
  duplicatedInstitutionForm: FormGroup;
  institutionParentSuccesfullyAdded: boolean = false;
  public defaultValue : string = "Select an institution...";
  institutionInfo: object = {};  
  childList: any[]=[];
  institutionList: any[]=[];
  settings = {
    mode: 'external',
    add: {
      addButtonContent: '<i class="fas fa-plus"></i>',
      createButtonContent: '<i class="fas fa-check"></i>',
      cancelButtonContent: '<i class="fas fa-times"></i>',
    },    
    columns: {
       id: {
         title: 'ID',
         type: 'number',
         width: '5%',
         filter: false
       },
       name: {
         title: 'Name',
         type: 'string',
         filter: false
       },
       acronym: {
         title: 'Acronym',
         type: 'string',
         filter: false
       },
       websiteLink: {
         title: 'Website',
         type: 'string',
         filter: false
       }
     },
     actions: {
       add: false, 
       edit: false,
       delete:false,
       custom: [{ name: 'delete', title: '<i class="fas fa-trash-alt ng2-smart-actions"></i>', }], 
       position: "right"
     }

  };
  source: LocalDataSource = new LocalDataSource();
  data: any;
  loading = false;

  constructor(private dialogService: NbDialogService, private institutionService: InstitutionService,private formBuilder: FormBuilder, private toastrService: NbToastrService) {
this.duplicatedInstitutionForm=this.createDuplicatedInstitutionForm();

   }


createDuplicatedInstitutionForm (): FormGroup {
  return this.formBuilder.group(
    {
      id: [ null,Validators.compose([
        Validators.required
      ])],
      name: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      acronym: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      website: [
        null,
        Validators.compose([
          Validators.required
        ])
      ],
      institutionList: [
        null,
        Validators.compose([
          Validators.required
        ])
      ]
    }
  );
}
  ngOnInit(): void {
    
    
   
  }

  search(){      
    let id = this.duplicatedInstitutionForm.controls['id'].value;
    this.institutionService.getInstitutionbyId(id).subscribe(x => {     
      if (x) {        
        this.duplicatedInstitutionForm.controls['name'].setValue(x.name);
        this.duplicatedInstitutionForm.controls['acronym'].setValue(x.acronym);
        this.duplicatedInstitutionForm.controls['website'].setValue(x.websiteLink);
        //load institutionRelated
        this.institutionService.getInstitutionParent(id).subscribe(y => {
          this.childList=y;
          this.source.load(y);
        });
        this.institutionService.getInstitutionChild(id).subscribe(z=>{          
          this.institutionList=z;
          this.duplicatedInstitutionForm.controls['institutionList'].setValue(null);
        });

      }else{
        this.duplicatedInstitutionForm.controls['name'].reset();
        this.duplicatedInstitutionForm.controls['acronym'].reset();
        this.duplicatedInstitutionForm.controls['website'].reset();
        this.duplicatedInstitutionForm.controls['institutionList'].setValue(null);
        this.childList=[];
      }     
    });
  }

  addInstitution(event: any) {    
    let id = this.duplicatedInstitutionForm.controls['institutionList'].value.id;  
    let found:boolean= this.childList.find(c => c.id==id);
    if(!found){
      this.institutionService.getInstitutionbyId(id).subscribe(x=> {
        this.childList.push(x);
        this.source.refresh();
        this.source.load(this.childList);
        this.duplicatedInstitutionForm.controls['institutionList'].setValue(null);
      }
      );
    }else{
      this.duplicatedInstitutionForm.controls['institutionList'].setValue(null);
    }      
  }

  submit(){
    let id = this.duplicatedInstitutionForm.controls['id'].value;
    var data=[];
    for(let location of this.childList){
      data.push({
        institutionId: location.id,
        institutionName: location.name,
        institutionWebsite: location.website,
        active: true
      });
    }


    this.institutionInfo={
      institutionId : id,
      institutionName: this.duplicatedInstitutionForm.controls['name'].value , 
      institutionChildList: data
    };
    console.log(this.institutionInfo);
    this.institutionService.postInstitutionParent(this.institutionInfo).subscribe(x => {
      this.institutionParentSuccesfullyAdded = true;
      if(x!=null){
        this.showUpdateToast();
      }
      setTimeout(() => {
        this.institutionParentSuccesfullyAdded = false;      
      }, 3000)
    });
  }

  showUpdateToast(){
    this.toastrService.show(
      `The Institution  ${this.duplicatedInstitutionForm.controls['id'].value} - ${this.duplicatedInstitutionForm.controls['name'].value} has been updated successfully` ,
      'Institutions updated!',
      { duration: 5000, status: 'success' });
  }

  deleteInstitution(event: any){
   console.log(event.data)
   this.childList=this.childList.filter(obj => obj.id!= event.data.id);
   this.source.load(this.childList);
  }
  
 
  

  onCustom(event: any) {
    let action = event['action'];
    switch (action) {     
      case 'delete':
        this.deleteInstitution(event);
        break;

      default:
        break;
    }
  }
 
}
