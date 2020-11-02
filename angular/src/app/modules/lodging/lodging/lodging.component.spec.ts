import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { LodgingComponent } from './lodging.component';
import { Observable, of } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ToastService } from 'services/toast/toast.service';

describe('LodgingComponent', () => {
  let component: LodgingComponent;
  let fixture: ComponentFixture<LodgingComponent>;

  let toastServiceSpy: jasmine.SpyObj<ToastService>;

  const lodgings: Lodging[] = [
    {
      id: 1,
      location: {
        id: '1',
        address: {
          id: '1',
          city: 'testCity',
          country: 'testCountry',
          postalCode: 'testCode',
          stateProvince: 'testState',
          street: 'testStreet',
        },
        latitude: 'testLat',
        longitude: 'testLong',
      },
      name: 'test',
      rentals: [],
      reviews: [],
      bathrooms: 1,
      imageUrls: ['http://placecorgi.com/300'],
    },
    {
      id: 2,
      location: {
        id: '2',
        address: {
          id: '2',
          city: 'testCity',
          country: 'testCountry',
          postalCode: 'testCode',
          stateProvince: 'testState',
          street: 'testStreet',
        },
        latitude: 'testLat',
        longitude: 'testLong',
      },
      name: 'test2',
      rentals: [],
      reviews: [],
      bathrooms: 1,
      imageUrls: ['http://placecorgi.com/300'],
    },
  ];

  const imageUrlsMock = ['http://placecorgi.com/300'];

  const lodgingServiceStub = {
    get(): Observable<Lodging[]> {
      return of(lodgings);
    },

    getImages(id: string): Observable<string[]> {
      return of(imageUrlsMock);
    },
  };

  beforeEach(
    waitForAsync(() => {
      const spy = jasmine.createSpyObj('ToastService', ['toastError']);

      TestBed.configureTestingModule({
        declarations: [LodgingComponent],
        imports: [HttpClientTestingModule],
        providers: [
          { provide: LodgingService, useValue: lodgingServiceStub },
          { provide: ToastService, useValue: spy },
        ],
        schemas: [NO_ERRORS_SCHEMA],
      })
        .compileComponents()
        .then(() => {
          toastServiceSpy = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
        });

      fixture = TestBed.createComponent(LodgingComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      TestBed.inject(HttpTestingController);
    })
  );

  /**
   * tests the whole lodging component
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * tests if the lodges are returned correctly
   */
  it('should get lodgings on initialization', () => {
    expect(component.lodgings).toBeTruthy();
    expect(component.lodgings).toEqual(lodgings);
  });

  /**
   * tests if the lodging name and address is displayed in the template
   */
  it('should display lodging info in the template', () => {
    const info = fixture.debugElement.nativeElement.querySelectorAll('p');
    expect(info[0].textContent).toContain('test');
    expect(info[1].textContent).toContain('testStreet');
    expect(info[2].textContent).toContain('testCity, testState, testCountry');
    expect(info[3].textContent).toContain('testCode');
  });

  /**
   * tests if the toast service can be called
   */
  it('should be able to call toast service method', () => {
    toastServiceSpy.toastError('error', 'error');
    expect(toastServiceSpy.toastError.calls.any()).toBe(true);
    expect(toastServiceSpy.toastError.calls.count()).toBe(1);
  });
});
