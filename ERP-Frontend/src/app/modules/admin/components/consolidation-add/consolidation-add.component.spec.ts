import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidationAddComponent } from './consolidation-add.component';

describe('ConsolidationAddComponent', () => {
  let component: ConsolidationAddComponent;
  let fixture: ComponentFixture<ConsolidationAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConsolidationAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsolidationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
