import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbTagComponent } from '@nebular/theme';
import { LocElement } from 'src/app/shared/interfaces/LocElement';
import { InstitutionTypeService } from 'src/app/shared/services/institutiontype.service';
import { LocationService } from 'src/app/shared/services/location.service';
import { InstitutionService } from '../../../services/institution.service';

@Component({
  selector: 'app-dialog-add-institution-prompt',
  templateUrl: './dialog-add-institution-prompt.component.html',
  styleUrls: ['./dialog-add-institution-prompt.component.scss']
})
export class DialogAddInstitutionPromptComponent implements OnInit {
  @Input() data: any;
  public defaultValue : string = "Select an option...";
  addInstitutionForm: FormGroup;
  submitted: boolean = false;
  institutionInfo: object = {};  
  showField: boolean = false;
  disableField: boolean = true;
  institutionType: string = '';
  institutionHq:LocElement=<LocElement> (<unknown>null);
  institutionLocations: LocElement=<LocElement> (<unknown>null);
  list: any[] = [];
  hqCountryList: any[]=[];
  countryList: any[]=[];
  institutionLocationList: Set<LocElement>= new Set([]);
  searchInstitution: boolean = false;
  institutionAlreadyExists: boolean = false;
  institutionSuccesfullyAdded: boolean = false;
  defaultLocation:LocElement={
    id:0,
    name: "",
    isoAlpha2:""
  } 
  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private institutionService: InstitutionService
  ,private innstitutionTypeService: InstitutionTypeService,private locationsService: LocationService) {
    this.addInstitutionForm = this.createAddInstitutionForm();
    this.loadInstitutionTypes();
    this.loadInstitutionHQ();
    this.loadInstitutionLocations();
   }

  ngOnInit(): void {
  }

  get form() { return this.addInstitutionForm.controls; }

  createAddInstitutionForm(): FormGroup {
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
      this.institutionType = this.list[0].id;
          
      this.addInstitutionForm.controls["type"].setValue(null);
    });
  }

  loadInstitutionHQ() {
    this.locationsService.getCountries().subscribe(x => {
      this.hqCountryList = x;
      this.institutionHq = this.defaultLocation;
      this.addInstitutionForm.controls['institutionHq'].setValue(this.institutionHq); 
         
    });
    
  }
  loadInstitutionLocations() {
    this.locationsService.getCountries().subscribe(x => {
      this.countryList=x;
     
      this.institutionLocations= this.defaultLocation;      
      this.addInstitutionForm.controls['institutionLocations'].setValue(this.institutionLocations);  
    });
    }



  validateField(controlName: string): string {
    let control = this.addInstitutionForm.controls[controlName];
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
    if (this.addInstitutionForm.valid) {      
      this.institutionInfo = {
        name: name,
        acronym: acronym,
        websiteLink: website,
        institutionType: {
          id: type
        },
        locations:data
      };      
      this.institutionService.postInstitution(this.institutionInfo).subscribe(x => {
        this.institutionSuccesfullyAdded = true;
        setTimeout(() => {
          this.institutionSuccesfullyAdded = false;
          this.ref.close(x);
        }, 3000)
      });
    }
  }
  

  loadInstitutionInfo() {
    this.searchInstitution = true;
    let id = this.addInstitutionForm.controls['id'].value;

    this.institutionService.getInstitutionbyId(id).subscribe(x => {
      if (x[0]) {
        if (x[0].id && x[0].id != null) {
          this.institutionAlreadyExists = true;
          this.addInstitutionForm.controls['name'].setValue(x[0].username);
          this.addInstitutionForm.controls['acronym'].setValue(x[0].firstName);
          this.addInstitutionForm.controls['website'].setValue(x[0].lastName);
        } 
      } else {
        this.institutionAlreadyExists = false;
        this.addInstitutionForm.controls['name'].reset();
        this.addInstitutionForm.controls['acronym'].reset();
        this.addInstitutionForm.controls['website'].reset();
      }
    });

    this.showField = true;
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
    console.log((this.addInstitutionForm.controls["institutionHq"].value))
    let value:any=this.addInstitutionForm.controls["institutionHq"].value
    for(let tagLocations of this.institutionLocationList){
      if(value!=0){
        if(value.id==tagLocations.id){
          this.addInstitutionForm.controls["institutionHq"].setValue(null);
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
    let headq:any =(this.addInstitutionForm.controls["institutionHq"].value)    
    let found:Boolean=false;
    for(let data of this.institutionLocationList){
      if(data.id==location.id){
        found=true;
      }
    }
    
    if(!found){
      if(headq!=0){
        if(obj.id!=headq.id ){
          this.institutionLocationList.add(obj);
        }    
      }
      
    }   
    this.addInstitutionForm.controls["institutionLocations"].setValue(null);
    
  }
}