import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbTagComponent } from '@nebular/theme';
import { LocElement } from 'src/app/shared/interfaces/LocElement';
import { InstitutionTypeService } from 'src/app/shared/services/institutiontype.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { InstitutionService } from '../../../services/institution.service';

@Component({
  selector: 'app-dialog-edit-institution-prompt',
  templateUrl: './dialog-edit-institution-prompt.component.html',
  styleUrls: ['./dialog-edit-institution-prompt.component.scss']
})
export class DialogEditInstitutionPromptComponent implements OnInit {
  @Input() data: any;
  @Input() id: number = 0;
  @Input() name: string = '';
  @Input() acronym: string = '';
  @Input() website: string = '';
  @Input() type: string = '';
  @Input() hq:  LocElement =<LocElement> (<unknown>null);
  @Input() locations: LocElement[]=[];
  public defaultValue : string = "Select an option...";
  editInstitutionForm!: FormGroup;
  submitted: boolean = false;
  institutionInfo: object = {};   
  institutionType: string = '';
  institutionHq: LocElement=<LocElement> (<unknown>null);
  institutionLocations: LocElement|string=<LocElement> (<unknown>null);
  list: any[] = [];
  hqCountryList: any[]=[];
  countryList: any[]=[];
  institutionLocationList: Set<LocElement>= new Set([]);
  
  institutionAlreadyExists: boolean = false;
  institutionSuccesfullyUpdated: boolean = false;
   fillData:boolean = false;
  
  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private institutionService: InstitutionService
  ,private innstitutionTypeService: InstitutionTypeService,private locationsService: LocationService) { }

  ngOnInit(): void {
    this.fillData=true;
    this.editInstitutionForm = this.createEditInstitutionForm();
    this.loadInstitutionTypes();
    this.loadInstitutionHQ();
    this.loadInstitutionLocations();
    this.loadInstitutionInfo();
  }

  get form() { return this.editInstitutionForm.controls; }

  createEditInstitutionForm(): FormGroup {
    return this.formBuilder.group(
      {
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
        type: [ 
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        institutionHq: [ 
          null,
          Validators.compose([
            Validators.required
          ])
        ],
        institutionLocations: [ 
          null,
          Validators.compose([
            Validators.required
          ])
        ]
      }
    );
  }

  loadInstitutionTypes() {
    this.innstitutionTypeService.getInstitutionType().subscribe(x => {
      this.list = x;         
      this.institutionType=this.type;  
      this.editInstitutionForm.controls['type'].setValue(this.type);           
    });
  }

  loadInstitutionHQ() {
    this.locationsService.getCountries().subscribe(x => {
      this.hqCountryList = x;        
      this.institutionHq=this.hqCountryList.find(country => country.id==this.hq.id);          
      this.editInstitutionForm.controls['institutionHq'].setValue(this.institutionHq);         
    });
    
  }
  loadInstitutionLocations() {
    this.locationsService.getCountries().subscribe(x => {
      this.countryList=x;      
      this.editInstitutionForm.controls['institutionLocations'].setValue(null);  
      this.locations.forEach(loc => this.institutionLocationList.add(loc));
      this.fillData=true;
    });
    }



  validateField(controlName: string): string {
    let control = this.editInstitutionForm.controls[controlName];
    if (this.submitted && control.invalid) {
      return 'danger';
    } if (this.submitted && !control.invalid) { 
      return 'success';
    } else {
      return 'basic';
    }
  }
  
  submit(name: any, acronym: any, website: any, type: any,locationhq:any) {
    this.submitted = true;
    var data=[];
    data.push({
      location:{
        id: locationhq.id,
        name: locationhq.name,
        isoAlpha2: locationhq.isoAlpha2
      },
      headquarter: true                 
    });
    for(let location of this.institutionLocationList){
      data.push({
        location:{
          id: location.id,
          name: location.name,
          isoAlpha2: location.isoAlpha2
        },
        headquarter: false                 
      });
    }
    if (this.editInstitutionForm.valid) {      
      this.institutionInfo = {
        id:this.id,
        name: name,
        acronym: acronym,
        websiteLink: website,
        institutionType: {
          id: type
        },
        locations:data
      };      
      this.institutionService.updateInstitution(this.institutionInfo).subscribe(x => {
        this.institutionSuccesfullyUpdated = true;
        setTimeout(() => {
          this.institutionSuccesfullyUpdated = false;
          this.ref.close(x);
        }, 3000)
      });
    }
  }
  

  loadInstitutionInfo() {            
          this.institutionAlreadyExists = true;
          this.editInstitutionForm.controls['name'].setValue(this.name);
          this.editInstitutionForm.controls['acronym'].setValue(this.acronym);
          this.editInstitutionForm.controls['website'].setValue(this.website);  
          
  }


  
  cancel() {
    this.ref.close();
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    let valueFind: LocElement= <LocElement> (<unknown>null);
    let found: boolean= false;    
    for(let value of this.institutionLocationList ){
      if(value.name === tagToRemove.text){
        valueFind=value;
        found=true;
      }
    }
    if(found){
      this.institutionLocationList.delete(valueFind);
    }
    
  }

  validatehq(location : any){
    
    let value:any=this.editInstitutionForm.controls["institutionHq"].value    
    for(let tagLocations of this.institutionLocationList){
      if(value!=0){
        if(value.id==tagLocations.id){
          this.editInstitutionForm.controls["institutionHq"].setValue(null);
        }
      }
      
    }    
  }

  addCountry(location : any){       
      let obj: LocElement ={
      id: location.id,
      name: location.name,
      isoAlpha2: location.isoAlpha2
    }
    let found:Boolean=false;
    for(let data of this.institutionLocationList){
      if(data.id==location.id){
        found=true;
      }
    }
    if(!found){
      if(obj.id!=this.institutionHq.id){
        this.institutionLocationList.add(obj);
      }
     
    }   
    this.institutionLocations="0";
    this.editInstitutionForm.controls["institutionLocations"].setValue(null);
  }
}