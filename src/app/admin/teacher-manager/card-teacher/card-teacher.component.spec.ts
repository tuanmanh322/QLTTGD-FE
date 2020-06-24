import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTeacherComponent } from './card-teacher.component';

describe('CardTeacherComponent', () => {
  let component: CardTeacherComponent;
  let fixture: ComponentFixture<CardTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
