import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerEmployeeRegistrationComponent } from './manager-employee-registration.component';

describe('ManagerEmployeeRegistrationComponent', () => {
  let component: ManagerEmployeeRegistrationComponent;
  let fixture: ComponentFixture<ManagerEmployeeRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerEmployeeRegistrationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerEmployeeRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
