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
      this.addInstitutionForm.controls['type'].setValue(this.institutionType);      
    });
  }

  loadInstitutionHQ() {
    this.locationsService.getCountries().subscribe(x => {
      this.hqCountryList = x;
      this.institutionHq = this.hqCountryList[0];
      this.addInstitutionForm.controls['hqCountry'].setValue(this.institutionHq); 
         
    });
    
  }
  loadInstitutionLocations() {
    this.locationsService.getCountries().subscribe(x => {
      this.countryList=x;
      this.institutionLocations=this.countryList[0];
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
  
  submit(name: any, acronym: any, website: any, type: any) {
    this.submitted = true;

    if (this.addInstitutionForm.valid) {
      this.institutionInfo = {
        name: name,
        acronym: acronym,
        websiteLink: website,
        institutionType: {
          id: type
        }
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

  addCountry(location : any){       
    console.log(location);
    let obj: LocElement ={
      id: location.id,
      name: location.name,
      alpha2: location.alpha2
    }
    this.institutionLocationList.add(obj);
  }
}