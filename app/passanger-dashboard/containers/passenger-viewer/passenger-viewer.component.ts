import { Component, OnInit } from '@angular/core';
import {PassengerService} from '../passenger-dashboard/services/passenger.service';
import {Passenger} from '../passenger-dashboard/models/passanger.interfaces';
import { Router, Params, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: "app-passenger-viewer",
  styleUrls: ["passenger-viewer.component.scss"],
  template: `
    <div>
      <button (click)="goBack()">
        &lsaquo; Go Back
      </button>
      <app-passenger-form [detail]="passenger" (update)="onUpdatePassenger($event)">
      </app-passenger-form>
    </div>
  `
})
export class PassengerViewerComponent implements OnInit {
  passenger: Passenger;

  constructor(
      private router: Router,
      private route: ActivatedRoute,
      private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.route.params
    .switchMap((data: Passenger) => this.passengerService.getPassenger(data.id))
    .subscribe((data: Passenger) => this.passenger = data);
  }

  onUpdatePassenger(event: Passenger) {
      this.passengerService.updatePassengers(event)
      .subscribe((data: Passenger) => {
        this.passenger = Object.assign({}, this.passenger, event);
      });
  }

  goBack() {
    this.router.navigate(['/passengers']);
  }

}
