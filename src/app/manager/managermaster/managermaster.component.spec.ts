import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagermasterComponent } from './managermaster.component';

describe('ManagermasterComponent', () => {
  let component: ManagermasterComponent;
  let fixture: ComponentFixture<ManagermasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagermasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagermasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
