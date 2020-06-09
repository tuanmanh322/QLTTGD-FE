import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFormClientComponent } from './search-form-client.component';

describe('SearchFormClientComponent', () => {
  let component: SearchFormClientComponent;
  let fixture: ComponentFixture<SearchFormClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFormClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFormClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
