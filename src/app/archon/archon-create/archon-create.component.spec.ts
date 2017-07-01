import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchonCreateComponent } from './archon-create.component';

describe('ArchonCreateComponent', () => {
  let component: ArchonCreateComponent;
  let fixture: ComponentFixture<ArchonCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchonCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchonCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
