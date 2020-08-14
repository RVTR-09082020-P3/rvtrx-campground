import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchResultsComponent } from './search-results.component';
import { Lodging } from 'src/app/data/lodging.model';
import { HttpClient } from '@angular/common/http';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('SearchResultsComponent', () => {
  const lodgings: Lodging[] = [
    {
      id: '',
      location: {
        id: '',
        address: {
          id: '',
          city: '',
          country: '',
          postalCode: '',
          stateProvince: '',
          street: '',
        },
        latitude: '',
        longitude: '',
      },
      name: '',
      rentals: [
        {
          id: '',
          name: '',
          occupancy: 1,
          type: '',
          status: 'available',
          price: 1.0,
        },
      ],
      reviews: [
        {
          id: '1',
          comment: 'comment',
          dateCreated: '2020-08-01',
          rating: 1,
        },
      ],
      bathrooms: 1,
    },
  ];
  const rating: boolean[] = [false, false, false, false, false, false, false, false, false, true];

  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SearchResultsComponent],
    }).compileComponents();

    TestBed.inject(HttpClient);
    TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    component.lodgings = lodgings;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have rating of', () => {
    expect(component.averageRating(lodgings[0])).toEqual(rating);
  });

  it('should make reservation', () => {
    component.makeReservation(lodgings[0]);
    // TODO connect to booking service mock
  });
});
