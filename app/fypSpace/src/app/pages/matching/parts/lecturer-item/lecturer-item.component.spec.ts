import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LecturerItemComponent } from './lecturer-item.component';

describe('LecturerItemComponent', () => {
  let component: LecturerItemComponent;
  let fixture: ComponentFixture<LecturerItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LecturerItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LecturerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
