import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendersMbrListComponent } from './lenders-mbr-list.component';

describe('LendersMbrListComponent', () => {
  let component: LendersMbrListComponent;
  let fixture: ComponentFixture<LendersMbrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LendersMbrListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendersMbrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
