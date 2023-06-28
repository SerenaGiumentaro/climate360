import { TestBed } from '@angular/core/testing';

import { PolarIceService } from './polar-ice.service';

describe('PolarIceService', () => {
  let service: PolarIceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolarIceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
