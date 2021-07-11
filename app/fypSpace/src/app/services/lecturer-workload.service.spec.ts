import { TestBed } from '@angular/core/testing';

import { LecturerWorkloadService } from './lecturer-workload.service';

describe('LecturerWorkloadService', () => {
  let service: LecturerWorkloadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LecturerWorkloadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
