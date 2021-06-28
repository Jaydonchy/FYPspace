import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSortPanelComponent } from './list-sort-panel.component';

describe('ListSortPanelComponent', () => {
  let component: ListSortPanelComponent;
  let fixture: ComponentFixture<ListSortPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSortPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSortPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
