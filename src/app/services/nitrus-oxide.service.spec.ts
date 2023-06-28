import { TestBed } from '@angular/core/testing';

import { NitrusOxideService } from './nitrus-oxide.service';

describe('NitrusOxideService', () => {
  let service: NitrusOxideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NitrusOxideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
