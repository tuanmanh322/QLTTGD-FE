import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePointsEditComponent } from './profile-points-edit.component';

describe('ProfilePointsEditComponent', () => {
  let component: ProfilePointsEditComponent;
  let fixture: ComponentFixture<ProfilePointsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePointsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePointsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
