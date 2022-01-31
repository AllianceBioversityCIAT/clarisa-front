import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddUserPromptComponent } from './dialog-add-user-prompt.component';

describe('DialogAddUserPromptComponent', () => {
  let component: DialogAddUserPromptComponent;
  let fixture: ComponentFixture<DialogAddUserPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAddUserPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddUserPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
