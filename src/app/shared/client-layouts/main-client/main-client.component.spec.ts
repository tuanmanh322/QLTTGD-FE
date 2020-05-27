import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainClientComponent } from './main-client.component';

describe('MainClientComponent', () => {
  let component: MainClientComponent;
  let fixture: ComponentFixture<MainClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
