import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersFormSubmissionComponent } from './providers-form-submission.component';

describe('ProvidersFormSubmissionComponent', () => {
  let component: ProvidersFormSubmissionComponent;
  let fixture: ComponentFixture<ProvidersFormSubmissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersFormSubmissionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersFormSubmissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
