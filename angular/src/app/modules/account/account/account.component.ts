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
import { from, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountService } from 'services/account/account.service';
import { BookingService } from 'services/booking/booking.service';
import { GenericEditingService } from 'services/editable/generic-editing.service';
import { ACCOUNT_EDITING_SERVICE } from '../account-editing.token';

@Component({
  selector: 'uic-account',
  templateUrl: './account.component.html',
})
export class AccountComponent {
  isAuthenticated$: Observable<boolean>;
  account$: Observable<Account>;
  address$: Observable<Address>;
  bookings$: Observable<Booking[]>;
  payments$: Observable<Payment[]>;
  profiles$: Observable<Profile[]>;
  reviews$: Observable<Review[]>;
  private readonly id = '-1';
  accountId = this.id;
//  email : string;
//  name: string;
  


  constructor(
    private readonly identity: OktaAuthService,
    private readonly accountService: AccountService,
    private readonly bookingService: BookingService,
    @Inject(ACCOUNT_EDITING_SERVICE)
    editingService: GenericEditingService<Partial<Account>>
  ) {
    //this.email = 'beforepromise';
    //this.name = 'beforepromise';
    this.isAuthenticated$ = from(this.identity.isAuthenticated());
    this.identity.getUser().then((res) =>{
       
      //  this.email = res.email as string;
      //  this.name = res.name as string;
        const builder: Partial<Account> = {};
        builder.name = res.email as string;
        builder.email = res.name as string;
        const account: Account = builder as Account;
        this.accountService.post(account).subscribe({
          next: (e) => console.log(e),
          error: (e) => console.error(e),
        });
        

    }).catch((err) => {
      console.log("failure getting okta auth");
    });

      

    this.account$ = this.accountService.getEmail("test@Test.com"); 
 


    

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
}
