import { Component, Input, OnInit } from '@angular/core';
import { Passenger } from '../../models/passanger.interfaces';

@Component({
  selector: 'app-passenger-dashboard-counter',
  styleUrls: [],
  template: `
    <div>
      Total Checked in:  {{checkedInCount() }} / {{totalPassanger()}}
    </div>
  `
})
export class PassengerDashoardCounterComponent implements OnInit{
  @Input()
  items: Passenger[];

  constructor() {}

ngOnInit(): void {
  this.items = this.items;
}

  checkedInCount(): number {
    if(!this.items){
      return;
    }
    return this.items.filter((passenger: Passenger) => passenger.checkedIn).length;
  }

  totalPassanger(): number {
    if(!this.items)
      return ;
    return this.items.length;
  }
}
