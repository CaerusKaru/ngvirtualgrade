import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesCourseComponent } from './courses-course.component';

describe('CoursesCourseComponent', () => {
  let component: CoursesCourseComponent;
  let fixture: ComponentFixture<CoursesCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
