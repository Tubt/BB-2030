import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthFilterComponent } from './month-filter.component';

describe('MonthFilterComponent', () => {
  let component: MonthFilterComponent;
  let fixture: ComponentFixture<MonthFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
