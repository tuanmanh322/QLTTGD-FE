import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectCreateComponent } from './subject-create.component';

describe('SubjectCreateComponent', () => {
  let component: SubjectCreateComponent;
  let fixture: ComponentFixture<SubjectCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
