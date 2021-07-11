import { TestBed } from '@angular/core/testing';

import { RoleAuthGuardGuard } from './role-auth-guard.guard';

describe('RoleAuthGuardGuard', () => {
  let guard: RoleAuthGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleAuthGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
