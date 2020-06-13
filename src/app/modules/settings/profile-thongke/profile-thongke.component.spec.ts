import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileThongkeComponent } from './profile-thongke.component';

describe('ProfileThongkeComponent', () => {
  let component: ProfileThongkeComponent;
  let fixture: ComponentFixture<ProfileThongkeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileThongkeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileThongkeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
