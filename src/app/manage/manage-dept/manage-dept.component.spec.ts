import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDeptComponent } from './manage-dept.component';

describe('ManageDeptComponent', () => {
  let component: ManageDeptComponent;
  let fixture: ComponentFixture<ManageDeptComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageDeptComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageDeptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
