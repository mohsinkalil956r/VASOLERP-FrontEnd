import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbrRequestDetailComponent } from './mbr-request-detail.component';

describe('MbrRequestDetailComponent', () => {
  let component: MbrRequestDetailComponent;
  let fixture: ComponentFixture<MbrRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbrRequestDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbrRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
