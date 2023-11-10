import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardLenderComponent } from './dashboard-lender.component';

describe('DashboardLenderComponent', () => {
  let component: DashboardLenderComponent;
  let fixture: ComponentFixture<DashboardLenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardLenderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardLenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
