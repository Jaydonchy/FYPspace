import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalsRepoComponent } from './proposals-repo.component';

describe('ProposalsRepoComponent', () => {
  let component: ProposalsRepoComponent;
  let fixture: ComponentFixture<ProposalsRepoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProposalsRepoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalsRepoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
