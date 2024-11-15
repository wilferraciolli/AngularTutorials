import { TestBed } from '@angular/core/testing';

import { SkeletonLoadersService } from './skeleton-loaders.service';

describe('SkeletonLoadersService', () => {
  let service: SkeletonLoadersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkeletonLoadersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
