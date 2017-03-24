import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchonItemComponent } from './archon-item.component';

describe('ArchonItemComponent', () => {
  let component: ArchonItemComponent;
  let fixture: ComponentFixture<ArchonItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchonItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
