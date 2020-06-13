import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHocbaDetailComponent } from './profile-hocba-detail.component';

describe('ProfileHocbaDetailComponent', () => {
  let component: ProfileHocbaDetailComponent;
  let fixture: ComponentFixture<ProfileHocbaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileHocbaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileHocbaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
