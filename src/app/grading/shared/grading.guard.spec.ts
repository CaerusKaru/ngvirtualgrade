import { TestBed, async, inject } from '@angular/core/testing';

import { GradingGuard } from './grading.guard';

describe('GradingGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GradingGuard]
    });
  });

  it('should ...', inject([GradingGuard], (guard: GradingGuard) => {
    expect(guard).toBeTruthy();
  }));
});
