import { TestBed, inject } from '@angular/core/testing';

import { NavDrawerService } from './nav-drawer.service';

describe('NavDrawerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NavDrawerService]
    });
  });

  it('should ...', inject([NavDrawerService], (service: NavDrawerService) => {
    expect(service).toBeTruthy();
  }));
});
