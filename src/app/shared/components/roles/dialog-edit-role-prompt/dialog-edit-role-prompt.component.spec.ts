import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditRolePromptComponent } from './dialog-edit-role-prompt.component';

describe('DialogEditRolePromptComponent', () => {
  let component: DialogEditRolePromptComponent;
  let fixture: ComponentFixture<DialogEditRolePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditRolePromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditRolePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
