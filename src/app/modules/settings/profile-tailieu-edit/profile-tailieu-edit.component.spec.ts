import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileTailieuEditComponent } from './profile-tailieu-edit.component';

describe('ProfileTailieuEditComponent', () => {
  let component: ProfileTailieuEditComponent;
  let fixture: ComponentFixture<ProfileTailieuEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileTailieuEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileTailieuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
