import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesItemComponent } from './grades-item.component';

describe('GradesItemComponent', () => {
  let component: GradesItemComponent;
  let fixture: ComponentFixture<GradesItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradesItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
