import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditUserPromptComponent } from './dialog-edit-user-prompt.component';

describe('DialogEditUserPromptComponent', () => {
  let component: DialogEditUserPromptComponent;
  let fixture: ComponentFixture<DialogEditUserPromptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditUserPromptComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogEditUserPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
