import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionDetailComponent } from './form-submission-detail.component';

describe('FormSubmissionDetailComponent', () => {
  let component: FormSubmissionDetailComponent;
  let fixture: ComponentFixture<FormSubmissionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubmissionDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmissionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
