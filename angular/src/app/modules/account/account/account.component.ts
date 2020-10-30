import { HttpErrorResponse } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { nullSafeIsEquivalent } from '@angular/compiler/src/output/output_ast';
import { Component, Inject } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OktaAuthService } from '@okta/okta-angular';
import { Account } from 'data/account.model';
import { Address } from 'data/address.model';
import { Booking } from 'data/booking.model';
import { Payment } from 'data/payment.model';
import { Profile } from 'data/profile.model';
import { Review } from 'data/review.model';
import { stringify } from 'querystring';
import { from, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AccountService } from 'services/account/account.service';
import { BookingService } from 'services/booking/booking.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';

@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent {
 // isAuthenticated$: Observable<boolean>;
  account$: Observable<Account>;
  address$: Observable<Address>;
  bookings$: Observable<Booking[]>;
  payments$: Observable<Payment[]>;
  profiles$: Observable<Profile[]>;
  reviews$: Observable<Review[]>;
  private readonly id = '-1';
  accountId = this.id;
  email : string;
  name: string;
  


  constructor(
    private readonly identity: OktaAuthService,
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    editingService: GenericEditingService<Partial<Account>>
  ) {


    this.email = this.accountService.getTokenValue("email");
    this.name = this.accountService.getTokenValue("name");
    this.account$ = this.accountService.getEmail(this.accountService.getTokenValue("email")).pipe(catchError(this.handleError)); 
   
    

    // TODO: get only the bookings of this account
    this.bookings$ = this.bookingService.get();

    this.reviews$ = of([
      // Not yet implemented
    ]);
    this.address$ = this.account$.pipe(map((account) => account.address));
    this.payments$ = this.account$.pipe(map((account) => account.payments));
    this.profiles$ = this.account$.pipe(map((account) => account.profiles)); 
     

    // Pass initial model to editingService which acts as model for overwriting data coming in
    this.account$.subscribe((e) => editingService.update(e));
    // Register function for Payload release from editing service
    editingService.payloadEmitter.subscribe((val) => this.update(val as Account));
  }
 
 
    
  

  
  /**
   * Function registered to the editing service
   */
  private update(payload: Account): void {
    this.accountService.put(payload).subscribe({
      next: (e) => console.log(e),
      error: (e) => console.error(e),
    });
  }

  private handleError(error: HttpErrorResponse) {
    
    const builder: Partial<Account> = {};
    builder.name = this.accountService.getTokenValue("name");
    builder.email = this.accountService.getTokenValue("email");
    const account: Account = builder as Account;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error('An error occurred:', error.error.message);
      this.accountService.post(account);
      console.log('posting');
      this.accountService.getEmail(this.accountService.getTokenValue("email"));
      console.log('getting...');
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  
}
}
