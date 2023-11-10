import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersAddComponent } from './lenders-add.component';

describe('LendersAddComponent', () => {
  let component: LendersAddComponent;
  let fixture: ComponentFixture<LendersAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendersAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
