import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersSubmissionDetailsComponent } from './providers-submission-details.component';

describe('ProvidersSubmissionDetailsComponent', () => {
  let component: ProvidersSubmissionDetailsComponent;
  let fixture: ComponentFixture<ProvidersSubmissionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersSubmissionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersSubmissionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
