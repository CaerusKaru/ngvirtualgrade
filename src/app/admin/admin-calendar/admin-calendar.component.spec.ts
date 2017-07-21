import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendarComponent } from './admin-calendar.component';

describe('AdminCalendarComponent', () => {
  let component: AdminCalendarComponent;
  let fixture: ComponentFixture<AdminCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
