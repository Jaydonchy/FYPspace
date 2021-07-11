import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerMeetingTableComponent } from './lecturer-meeting-table.component';

describe('LecturerMeetingTableComponent', () => {
  let component: LecturerMeetingTableComponent;
  let fixture: ComponentFixture<LecturerMeetingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturerMeetingTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerMeetingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
