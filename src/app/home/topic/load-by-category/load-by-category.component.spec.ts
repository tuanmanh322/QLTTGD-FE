import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadByCategoryComponent } from './load-by-category.component';

describe('LoadByCategoryComponent', () => {
  let component: LoadByCategoryComponent;
  let fixture: ComponentFixture<LoadByCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadByCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadByCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
