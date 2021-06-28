import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFilterPanelComponent } from './list-filter-panel.component';

describe('ListFilterPanelComponent', () => {
  let component: ListFilterPanelComponent;
  let fixture: ComponentFixture<ListFilterPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFilterPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFilterPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
