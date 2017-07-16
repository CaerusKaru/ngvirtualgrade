import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingAboutComponent } from './landing-about.component';

describe('LandingAboutComponent', () => {
  let component: LandingAboutComponent;
  let fixture: ComponentFixture<LandingAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
