import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MbrListComponent } from './mbr-list.component';

describe('MbrListComponent', () => {
  let component: MbrListComponent;
  let fixture: ComponentFixture<MbrListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MbrListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MbrListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
