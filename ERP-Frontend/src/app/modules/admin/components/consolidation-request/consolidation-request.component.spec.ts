import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationRequestComponent } from './consolidation-request.component';

describe('ConsolidationRequestComponent', () => {
  let component: ConsolidationRequestComponent;
  let fixture: ComponentFixture<ConsolidationRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidationRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidationRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
