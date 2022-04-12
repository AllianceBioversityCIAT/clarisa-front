import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditInstitutionPromptComponent } from './dialog-edit-institution-prompt.component';

describe('DialogEditInstitutionPromptComponent', () => {
  let component: DialogEditInstitutionPromptComponent;
  let fixture: ComponentFixture<DialogEditInstitutionPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditInstitutionPromptComponent ] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditInstitutionPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
