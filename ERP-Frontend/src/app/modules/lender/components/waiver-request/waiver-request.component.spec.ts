import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiverRequestComponent } from './waiver-request.component';

describe('WaiverRequestComponent', () => {
  let component: WaiverRequestComponent;
  let fixture: ComponentFixture<WaiverRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaiverRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaiverRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
