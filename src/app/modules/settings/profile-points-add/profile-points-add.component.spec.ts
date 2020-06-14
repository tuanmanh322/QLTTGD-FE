import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePointsAddComponent } from './profile-points-add.component';

describe('ProfilePointsAddComponent', () => {
  let component: ProfilePointsAddComponent;
  let fixture: ComponentFixture<ProfilePointsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePointsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePointsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
