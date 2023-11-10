import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvidersViewComponent } from './providers-view.component';

describe('ProvidersViewComponent', () => {
  let component: ProvidersViewComponent;
  let fixture: ComponentFixture<ProvidersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProvidersViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvidersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
