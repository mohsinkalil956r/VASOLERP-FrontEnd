import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersListComponent } from './lenders-list.component';

describe('LendersListComponent', () => {
  let component: LendersListComponent;
  let fixture: ComponentFixture<LendersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
