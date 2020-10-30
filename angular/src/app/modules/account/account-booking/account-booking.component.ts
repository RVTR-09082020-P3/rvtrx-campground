import { Component, Input, OnInit } from '@angular/core';
import { Booking } from '../../../data/booking.model';

import { Observable } from 'rxjs';
import { Lodging } from 'src/app/data/lodging.model';
import { LodgingService } from 'src/app/services/lodging/lodging.service';

@Component({
  selector: 'uic-account-booking',
  templateUrl: './account-booking.component.html',
})
export class AccountBookingComponent implements OnInit {
  @Input() booking!: Booking;

  // Need the lodging booked and the url for that lodging's image
  bookedLodging: string[] = []; // testing
  url!: string;

  constructor(private lodgingService: LodgingService) {
    // DELETE LATER! Hardcoding image url for testing purposes
    console.log('BookedLodging before imageUrls: ', this.bookedLodging);
    this.bookedLodging = [];
    this.bookedLodging[0] = 'https://i.imgur.com/HB73HXb.jpg';
    console.log('BookedLodging after imageUrls: ', this.bookedLodging);
    this.url = this.bookedLodging[0];
    console.log('url: ', this.url);
  }

  ngOnInit(): void {
    // We get the lodging by the booking's lodging Id and set that the url
    // this.getBookedLodging();
  }
  // For getting that image url from the booked lodging
  getBookedLodging(): void {
    this.lodgingService.getById(this.booking.lodgingId).subscribe((lodge) => {
      // this.bookedLodging = lodge;     // Delete later, testing
      this.url = lodge.imageUrls[0]; // <--How it should be
    });
  }
}
