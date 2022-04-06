import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteUserPromptComponent } from './dialog-delete-user-prompt.component';

describe('DialogDeleteUserPromptComponent', () => {
  let component: DialogDeleteUserPromptComponent;
  let fixture: ComponentFixture<DialogDeleteUserPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteUserPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDeleteUserPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
