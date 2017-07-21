import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradersComponent } from './admin-graders.component';

describe('AdminGradersComponent', () => {
  let component: AdminGradersComponent;
  let fixture: ComponentFixture<AdminGradersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGradersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGradersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
