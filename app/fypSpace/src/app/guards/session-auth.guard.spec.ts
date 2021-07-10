import { TestBed } from '@angular/core/testing';

import { SessionAuthGuard } from './session-auth.guard';

describe('SessionAuthGuard', () => {
  let guard: SessionAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SessionAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
