import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePointsComponent } from './profile-points.component';

describe('ProfilePointsComponent', () => {
  let component: ProfilePointsComponent;
  let fixture: ComponentFixture<ProfilePointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
