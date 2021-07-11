import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerWorkloadTableComponent } from './lecturer-workload-table.component';

describe('LecturerWorkloadTableComponent', () => {
  let component: LecturerWorkloadTableComponent;
  let fixture: ComponentFixture<LecturerWorkloadTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturerWorkloadTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerWorkloadTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
