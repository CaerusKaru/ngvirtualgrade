import { TestBed, async, inject } from '@angular/core/testing';

import { AdminResolver } from './admin-resolver';

describe('AdminResolveGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminResolver]
    });
  });

  it('should ...', inject([AdminResolver], (guard: AdminResolver) => {
    expect(guard).toBeTruthy();
  }));
});
