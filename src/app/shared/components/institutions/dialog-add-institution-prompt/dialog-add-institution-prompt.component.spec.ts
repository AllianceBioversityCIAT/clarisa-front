import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddInstitutionPromptComponent } from './dialog-add-institution-prompt.component';

describe('DialogAddInstitutionPromptComponent', () => {
  let component: DialogAddInstitutionPromptComponent;
  let fixture: ComponentFixture<DialogAddInstitutionPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddInstitutionPromptComponent ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddInstitutionPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
