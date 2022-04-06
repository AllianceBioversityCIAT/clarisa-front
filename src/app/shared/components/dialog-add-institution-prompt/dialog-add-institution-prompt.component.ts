import { Component, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef } from '@nebular/theme';
import { InstitutionService } from '../../services/institution.service';

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
  
  searchInstitution: boolean = false;
  institutionAlreadyExists: boolean = false;
  institutionSuccesfullyAdded: boolean = false;
  
  constructor(@Optional() protected ref: NbDialogRef<any>, private formBuilder: FormBuilder, private institutionService: InstitutionService) {
    this.addInstitutionForm = this.createAddInstitutionForm();
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
        ]
      }
    );
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
        website: website,
        type: type 
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
}