import { Component, OnInit, Input } from '@angular/core';
import { Lodging } from 'src/app/data/lodging.model';

@Component({
  selector: 'uic-spotlight',
  templateUrl: './spotlight.component.html',
  styleUrls: ['./spotlight.component.scss'],
})
export class SpotlightComponent implements OnInit {
  @Input() lodgings: Lodging[];

  selectedLodging: Lodging;

  constructor() {}

  ngOnInit(): void {
    this.setSpotlight();
  }

  setSpotlight(): void {
    let temp = 0;
    for (let i = 0; i < this.lodgings.length; i++) {
      if (this.lodgings[i].rentals.length > temp) {
        temp = this.lodgings[i].rentals.length;
        this.selectedLodging = this.lodgings[i];
      }
    }
  }
}
