import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesLogComponent } from './pages-log.component';

describe('PagesLogComponent', () => {
  let component: PagesLogComponent;
  let fixture: ComponentFixture<PagesLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagesLogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagesLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
