import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingItemComponent } from './grading-item.component';

describe('GradingItemComponent', () => {
  let component: GradingItemComponent;
  let fixture: ComponentFixture<GradingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
