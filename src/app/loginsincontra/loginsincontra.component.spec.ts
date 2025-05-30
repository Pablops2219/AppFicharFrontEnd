import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginsincontraComponent } from './loginsincontra.component';

describe('LoginsincontraComponent', () => {
  let component: LoginsincontraComponent;
  let fixture: ComponentFixture<LoginsincontraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginsincontraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginsincontraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
