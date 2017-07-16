import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingCourseComponent } from './grading-course.component';

describe('GradingCourseComponent', () => {
  let component: GradingCourseComponent;
  let fixture: ComponentFixture<GradingCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
