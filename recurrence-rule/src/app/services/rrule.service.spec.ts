import { TestBed } from '@angular/core/testing';

import { RruleService } from './rrule.service';

describe('RruleService', () => {
  let service: RruleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RruleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
