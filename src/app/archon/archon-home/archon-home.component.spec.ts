import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchonHomeComponent } from './archon-home.component';

describe('ArchonHomeComponent', () => {
  let component: ArchonHomeComponent;
  let fixture: ComponentFixture<ArchonHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchonHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchonHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
