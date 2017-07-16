import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingHelpComponent } from './landing-help.component';

describe('LandingHelpComponent', () => {
  let component: LandingHelpComponent;
  let fixture: ComponentFixture<LandingHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
