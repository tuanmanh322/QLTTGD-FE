import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHocbaComponent } from './profile-hocba.component';

describe('ProfileHocbaComponent', () => {
  let component: ProfileHocbaComponent;
  let fixture: ComponentFixture<ProfileHocbaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHocbaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHocbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
