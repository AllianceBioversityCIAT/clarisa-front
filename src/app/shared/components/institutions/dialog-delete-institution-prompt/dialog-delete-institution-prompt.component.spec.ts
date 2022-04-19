import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteInstitutionPromptComponent } from './dialog-delete-institution-prompt.component';

describe('DialogDeleteRolePromptComponent', () => {
  let component: DialogDeleteInstitutionPromptComponent;
  let fixture: ComponentFixture<DialogDeleteInstitutionPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteInstitutionPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteInstitutionPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
