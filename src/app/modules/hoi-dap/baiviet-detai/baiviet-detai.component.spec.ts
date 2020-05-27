import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaivietDetaiComponent } from './baiviet-detai.component';

describe('BaivietDetaiComponent', () => {
  let component: BaivietDetaiComponent;
  let fixture: ComponentFixture<BaivietDetaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaivietDetaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaivietDetaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
