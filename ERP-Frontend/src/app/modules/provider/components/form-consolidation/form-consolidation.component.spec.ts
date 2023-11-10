import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsolidationComponent } from './form-consolidation.component';

describe('FormConsolidationComponent', () => {
  let component: FormConsolidationComponent;
  let fixture: ComponentFixture<FormConsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConsolidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
