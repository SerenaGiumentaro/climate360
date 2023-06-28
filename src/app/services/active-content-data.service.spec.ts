import { TestBed } from '@angular/core/testing';

import { ActiveContentDataService } from './active-content-data.service';

describe('ActiveContentDataService', () => {
  let service: ActiveContentDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveContentDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
