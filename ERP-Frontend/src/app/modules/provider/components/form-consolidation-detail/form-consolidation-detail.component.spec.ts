import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsolidationDetailComponent } from './form-consolidation-detail.component';

describe('FormConsolidationDetailComponent', () => {
  let component: FormConsolidationDetailComponent;
  let fixture: ComponentFixture<FormConsolidationDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConsolidationDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsolidationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
