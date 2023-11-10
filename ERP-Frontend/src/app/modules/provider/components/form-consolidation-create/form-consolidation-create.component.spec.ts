import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormConsolidationCreateComponent } from './form-consolidation-create.component';

describe('FormConsolidationCreateComponent', () => {
  let component: FormConsolidationCreateComponent;
  let fixture: ComponentFixture<FormConsolidationCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormConsolidationCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormConsolidationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
