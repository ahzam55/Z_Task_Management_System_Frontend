import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestmasterComponent } from './guestmaster.component';

describe('GuestmasterComponent', () => {
  let component: GuestmasterComponent;
  let fixture: ComponentFixture<GuestmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestmasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
