import { TestBed } from '@angular/core/testing';

import { LecturerGuardGuard } from './lecturer-guard.guard';

describe('LecturerGuardGuard', () => {
  let guard: LecturerGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LecturerGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
