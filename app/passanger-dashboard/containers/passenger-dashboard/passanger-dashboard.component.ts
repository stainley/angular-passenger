import { Component, OnInit } from '@angular/core';
import { Passenger } from './models/passanger.interfaces';
import { PassengerService } from './services/passenger.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-passanger-dashboard-component",
  styleUrls: ["./passanger-dashboard.component.scss"],
  template: `
    <div>
      <h3>Passengers</h3>
      <app-passenger-dashboard-counter
        [items]="passangers"
      ></app-passenger-dashboard-counter>

      <app-passenger-dashboard-detail
        *ngFor="let passenger of passangers"
        (view)="handleView($event)"
        [detail]="passenger"
        (edit)="handlerEdit($event)"
        (remove)="onHandlerRemove($event)"
      >
      </app-passenger-dashboard-detail>
    </div>
  `
})
export class PassangerDashboardComponent implements OnInit {
  passangers: Passenger[];

  constructor(
    private router: Router,
    private passengerService: PassengerService) {}

  ngOnInit(): void {
    this.passengerService.getPassengers().subscribe((data: Passenger[]) => {
      this.passangers = data;
    });
  }

  handlerEdit(event: Passenger) {
    this.passengerService
      .updatePassengers(event)
      .subscribe((data: Passenger) => {
        this.passangers = this.passangers.map((passenger: Passenger) => {
          if (passenger.id === event.id) {
            passenger = Object.assign({}, passenger, event);
          }
          return passenger;
        });
      });
  }

  onHandlerRemove(event: Passenger) {
    this.passengerService
      .deletePassengers(event)
      .subscribe((data: Passenger) => {
        this.passangers = this.passangers.filter((passenger: Passenger) => {
          return passenger.id !== event.id;
        });
      });
  }

  handleView(event: Passenger) {
    this.router.navigate(['passengers', event.id]);
  }
}
