import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBaivietComponent } from './post-baiviet.component';

describe('PostBaivietComponent', () => {
  let component: PostBaivietComponent;
  let fixture: ComponentFixture<PostBaivietComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBaivietComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBaivietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
