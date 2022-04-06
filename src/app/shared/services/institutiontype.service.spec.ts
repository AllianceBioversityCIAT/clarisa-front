import { TestBed } from '@angular/core/testing';

import { InstitutionTypeService } from './institutiontype.service';

describe('InstitutionTypeService', () => {
  let service: InstitutionTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstitutionTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
