import { TestBed } from '@angular/core/testing';

import { CarbonDioxideService } from './carbon-dioxide.service';

describe('CarbonDioxideService', () => {
  let service: CarbonDioxideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarbonDioxideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
