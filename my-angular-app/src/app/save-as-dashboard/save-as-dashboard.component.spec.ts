import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveAsDashboardComponent } from './save-as-dashboard.component';

describe('SaveAsDashboardComponent', () => {
  let component: SaveAsDashboardComponent;
  let fixture: ComponentFixture<SaveAsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveAsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveAsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
