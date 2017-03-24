import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingHomeComponent } from './grading-home.component';

describe('GradingHomeComponent', () => {
  let component: GradingHomeComponent;
  let fixture: ComponentFixture<GradingHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
