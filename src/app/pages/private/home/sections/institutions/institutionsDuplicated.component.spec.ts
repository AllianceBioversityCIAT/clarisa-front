import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionsDuplicatedComponent } from './institutionsDuplicated.component';

describe('InstitutionsDuplicatedComponent', () => {
  let component: InstitutionsDuplicatedComponent;
  let fixture: ComponentFixture<InstitutionsDuplicatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstitutionsDuplicatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsDuplicatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
