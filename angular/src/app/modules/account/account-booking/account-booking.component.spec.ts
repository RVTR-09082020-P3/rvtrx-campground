import { async, ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { AccountBookingComponent } from './account-booking.component';
import { Booking } from 'src/app/data/booking.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AccountBookingComponent', () => {
  const booking: Booking = {
    id: 'string',
    accountId: 'string',
    lodgingId: 'string',
    checkIn: '',
    checkOut: '',
    guests: [
      {
        id: 'string',
        type: 'string',
        email: 'string',
        familyName: '',
        givenName: '',
        phone: 'string',
        // Every guest's profile needs a profile picture to display
        pfpUrl: 'string',
      },
    ],
    rentals: [
      {
        id: '1',
        lotNumber: '1',
        unit: {
          size: '5x5',
          capacity: 2,
          name: 'tent',
        },
        status: 'available',
        price: 100,
      },
    ],
  };
  let component: AccountBookingComponent;
  let fixture: ComponentFixture<AccountBookingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AccountBookingComponent],
        imports: [HttpClientTestingModule],
        providers: [LodgingService],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountBookingComponent);
    component = fixture.componentInstance;
    component.booking = booking;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
