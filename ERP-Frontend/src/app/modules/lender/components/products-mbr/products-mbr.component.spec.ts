import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsMbrComponent } from './products-mbr.component';

describe('ProductsMbrComponent', () => {
  let component: ProductsMbrComponent;
  let fixture: ComponentFixture<ProductsMbrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsMbrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductsMbrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
