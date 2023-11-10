import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverRequestDetailComponent } from './waiver-request-detail.component';

describe('WaiverRequestDetailComponent', () => {
  let component: WaiverRequestDetailComponent;
  let fixture: ComponentFixture<WaiverRequestDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiverRequestDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiverRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
