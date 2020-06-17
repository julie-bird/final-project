import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailOverviewComponent } from './trail-overview.component';

describe('TrailOverviewComponent', () => {
  let component: TrailOverviewComponent;
  let fixture: ComponentFixture<TrailOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
