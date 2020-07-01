import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLopComponent } from './register-lop.component';

describe('RegisterLopComponent', () => {
  let component: RegisterLopComponent;
  let fixture: ComponentFixture<RegisterLopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterLopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterLopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
