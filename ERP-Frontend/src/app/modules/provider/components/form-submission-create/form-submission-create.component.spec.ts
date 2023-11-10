import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubmissionCreateComponent } from './form-submission-create.component';

describe('FormSubmissionCreateComponent', () => {
  let component: FormSubmissionCreateComponent;
  let fixture: ComponentFixture<FormSubmissionCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubmissionCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubmissionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
