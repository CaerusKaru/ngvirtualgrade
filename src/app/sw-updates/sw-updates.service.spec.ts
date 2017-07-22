import { TestBed, inject } from '@angular/core/testing';

import { SwUpdatesService } from './sw-updates.service';

describe('SwUpdatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SwUpdatesService]
    });
  });

  it('should be created', inject([SwUpdatesService], (service: SwUpdatesService) => {
    expect(service).toBeTruthy();
  }));
});
