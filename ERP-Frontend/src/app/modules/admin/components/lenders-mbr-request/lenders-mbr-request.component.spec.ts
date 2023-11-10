import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersMbrRequestComponent } from './lenders-mbr-request.component';

describe('LendersMbrRequestComponent', () => {
  let component: LendersMbrRequestComponent;
  let fixture: ComponentFixture<LendersMbrRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersMbrRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendersMbrRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
