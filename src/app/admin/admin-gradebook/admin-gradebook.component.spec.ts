import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGradebookComponent } from './admin-gradebook.component';

describe('AdminGradebookComponent', () => {
  let component: AdminGradebookComponent;
  let fixture: ComponentFixture<AdminGradebookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminGradebookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGradebookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
