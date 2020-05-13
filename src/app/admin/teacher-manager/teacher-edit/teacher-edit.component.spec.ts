import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherEditComponent } from './teacher-edit.component';

describe('TeacherEditComponent', () => {
  let component: TeacherEditComponent;
  let fixture: ComponentFixture<TeacherEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
