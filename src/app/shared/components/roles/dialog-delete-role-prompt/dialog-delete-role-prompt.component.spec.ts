import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteRolePromptComponent } from './dialog-delete-role-prompt.component';

describe('DialogDeleteRolePromptComponent', () => {
  let component: DialogDeleteRolePromptComponent;
  let fixture: ComponentFixture<DialogDeleteRolePromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteRolePromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteRolePromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
