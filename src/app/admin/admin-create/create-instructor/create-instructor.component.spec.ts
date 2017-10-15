import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstructorComponent } from './create-instructor.component';

describe('CreateInstructorComponent', () => {
  let component: CreateInstructorComponent;
  let fixture: ComponentFixture<CreateInstructorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInstructorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
