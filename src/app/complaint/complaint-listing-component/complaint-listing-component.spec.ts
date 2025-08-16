import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComplaintListingComponent } from './complaint-listing-component';

describe('ComplaintListingComponent', () => {
  let component: ComplaintListingComponent;
  let fixture: ComponentFixture<ComplaintListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComplaintListingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComplaintListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
