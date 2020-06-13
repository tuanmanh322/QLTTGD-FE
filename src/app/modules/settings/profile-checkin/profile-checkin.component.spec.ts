import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCheckinComponent } from './profile-checkin.component';

describe('ProfileCheckinComponent', () => {
  let component: ProfileCheckinComponent;
  let fixture: ComponentFixture<ProfileCheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileCheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
