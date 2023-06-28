import { TestBed } from '@angular/core/testing';

import { MethaneService } from './methane.service';

describe('MethaneService', () => {
  let service: MethaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MethaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
