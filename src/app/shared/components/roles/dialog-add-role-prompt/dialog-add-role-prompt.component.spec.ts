import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddRolePromptComponent } from './dialog-add-role-prompt.component';

describe('DialogAddRolePromptComponent', () => {
  let component: DialogAddRolePromptComponent;
  let fixture: ComponentFixture<DialogAddRolePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddRolePromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddRolePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
