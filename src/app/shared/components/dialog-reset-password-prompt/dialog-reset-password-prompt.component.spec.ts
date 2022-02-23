import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResetPasswordPromptComponent } from './dialog-reset-password-prompt.component';

describe('DialogResetPasswordPromptComponent', () => {
  let component: DialogResetPasswordPromptComponent;
  let fixture: ComponentFixture<DialogResetPasswordPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogResetPasswordPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogResetPasswordPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
