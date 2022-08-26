import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DOrdersComponent } from './d-orders.component';

describe('DOrdersComponent', () => {
  let component: DOrdersComponent;
  let fixture: ComponentFixture<DOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
