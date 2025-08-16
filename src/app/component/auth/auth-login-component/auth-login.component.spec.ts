import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentAuthLogin } from './auth-login.component';

describe('ComponentAuthLogin', () => {
  let component: ComponentAuthLogin;
  let fixture: ComponentFixture<ComponentAuthLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentAuthLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentAuthLogin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
