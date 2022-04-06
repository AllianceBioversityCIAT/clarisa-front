import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserPermissionsPromptComponent } from './dialog-user-permissions-prompt.component';

describe('DialogUserPermissionsPromptComponent', () => {
  let component: DialogUserPermissionsPromptComponent;
  let fixture: ComponentFixture<DialogUserPermissionsPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserPermissionsPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserPermissionsPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
