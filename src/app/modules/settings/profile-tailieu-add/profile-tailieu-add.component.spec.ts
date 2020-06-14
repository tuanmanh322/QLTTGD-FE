import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTailieuAddComponent } from './profile-tailieu-add.component';

describe('ProfileTailieuAddComponent', () => {
  let component: ProfileTailieuAddComponent;
  let fixture: ComponentFixture<ProfileTailieuAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTailieuAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTailieuAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
