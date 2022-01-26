import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserPromptComponent } from './dialog-user-prompt.component';

describe('DialogUserPromptComponent', () => {
  let component: DialogUserPromptComponent;
  let fixture: ComponentFixture<DialogUserPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogUserPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUserPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
