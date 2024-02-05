import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemBasicComponent } from './item-basic.component';

describe('ItemBasicComponent', () => {
  let component: ItemBasicComponent;
  let fixture: ComponentFixture<ItemBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemBasicComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
