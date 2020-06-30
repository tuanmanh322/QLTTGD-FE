import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinLoadComponent } from './checkin-load.component';

describe('CheckinLoadComponent', () => {
  let component: CheckinLoadComponent;
  let fixture: ComponentFixture<CheckinLoadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckinLoadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckinLoadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
