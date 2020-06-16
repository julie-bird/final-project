import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpottedComponent } from './spotted.component';

describe('SpottedComponent', () => {
  let component: SpottedComponent;
  let fixture: ComponentFixture<SpottedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpottedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpottedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
