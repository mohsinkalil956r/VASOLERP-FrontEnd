import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersWaiveListComponent } from './lenders-waive-list.component';

describe('LendersWaiveListComponent', () => {
  let component: LendersWaiveListComponent;
  let fixture: ComponentFixture<LendersWaiveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersWaiveListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendersWaiveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
