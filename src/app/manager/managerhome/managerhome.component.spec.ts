import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerhomeComponent } from './managerhome.component';

describe('ManagerhomeComponent', () => {
  let component: ManagerhomeComponent;
  let fixture: ComponentFixture<ManagerhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagerhomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManagerhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
