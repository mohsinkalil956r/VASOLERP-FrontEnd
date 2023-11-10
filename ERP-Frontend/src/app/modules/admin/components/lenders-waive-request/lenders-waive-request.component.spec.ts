import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersWaiveRequestComponent } from './lenders-waive-request.component';

describe('LendersWaiveRequestComponent', () => {
  let component: LendersWaiveRequestComponent;
  let fixture: ComponentFixture<LendersWaiveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersWaiveRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendersWaiveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
