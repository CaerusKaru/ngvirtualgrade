import { TestBed, inject } from '@angular/core/testing';

import { HomeMenuService } from './home-menu.service';

describe('HomeMenuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeMenuService]
    });
  });

  it('should be created', inject([HomeMenuService], (service: HomeMenuService) => {
    expect(service).toBeTruthy();
  }));
});
