import { Booking } from '../booking.model';

export const booking: Booking = {
  id: 'string',
  accountId: 1,
  lodgingId: 1,
  checkIn: '',
  checkOut: '',
  guests: [
    {
      id: 1,
      type: 'string',
      email: 'string',
      familyName: '',
      givenName: '',
      phone: 'string',
      imageUri:
        'https://avataaars.io/?avatarStyle=Circle&topType=LongHairCurly&accessoriesType=Prescription01&hairColor=Black&facialHairType=BeardMedium&facialHairColor=Auburn&clotheType=CollarSweater&clotheColor=White&eyeType=Close&eyebrowType=DefaultNatural&mouthType=Twinkle&skinColor=DarkBrown',
    },
  ],
  rentals: [
    {
      lodgingRentalId: 1,
    },
  ],
};

export const bookings: Booking[] = [
  {
    id: '0',
    accountId: 1,
    lodgingId: 1,
    guests: [],
    rentals: [],
    checkIn: '2020-08-01',
    checkOut: '2020-08-03',
  },
  {
    id: '0',
    accountId: 1,
    lodgingId: 2,
    guests: [],
    rentals: [],
    checkIn: '2020-08-01',
    checkOut: '2020-08-03',
  },
];

export const bookingMock: Booking[] = [
  {
    id: '0',
    accountId: 1,
    lodgingId: 0,
    guests: [],
    rentals: [],
    checkIn: '2020-08-01',
    checkOut: '2020-08-03',
  },
];
