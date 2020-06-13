import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTailieuComponent } from './profile-tailieu.component';

describe('ProfileTailieuComponent', () => {
  let component: ProfileTailieuComponent;
  let fixture: ComponentFixture<ProfileTailieuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTailieuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTailieuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
