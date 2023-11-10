import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbrRequestComponent } from './mbr-request.component';

describe('MbrRequestComponent', () => {
  let component: MbrRequestComponent;
  let fixture: ComponentFixture<MbrRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbrRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbrRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
