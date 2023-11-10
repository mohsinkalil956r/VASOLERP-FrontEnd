import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersFormConsolidationComponent } from './providers-form-consolidation.component';

describe('ProvidersFormConsolidationComponent', () => {
  let component: ProvidersFormConsolidationComponent;
  let fixture: ComponentFixture<ProvidersFormConsolidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersFormConsolidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersFormConsolidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
