import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadAllTopicComponent } from './load-all-topic.component';

describe('LoadAllTopicComponent', () => {
  let component: LoadAllTopicComponent;
  let fixture: ComponentFixture<LoadAllTopicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadAllTopicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadAllTopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
