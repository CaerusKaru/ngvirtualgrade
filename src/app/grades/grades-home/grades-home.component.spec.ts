import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesHomeComponent } from './grades-home.component';

describe('GradesHomeComponent', () => {
  let component: GradesHomeComponent;
  let fixture: ComponentFixture<GradesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
