import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentDataComponent } from './document-data.component';

describe('DocumentDataComponent', () => {
  let component: DocumentDataComponent;
  let fixture: ComponentFixture<DocumentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
