import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDetailViewComponent } from './contact-detail-view.component';

describe('ContactDetailViewComponent', () => {
  let component: ContactDetailViewComponent;
  let fixture: ComponentFixture<ContactDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
