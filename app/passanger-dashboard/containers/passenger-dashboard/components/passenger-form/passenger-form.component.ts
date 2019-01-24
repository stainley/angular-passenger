import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

// interfaces
import { Passenger } from '../../models/passanger.interfaces';
import { Baggage } from '../../models/baggage.interface';


@Component({
  selector: "app-passenger-form",
  styleUrls: ["passenger-form.component.scss"],
  template: `
    <form (ngSubmit)="handleSubmit(form.value, form.valid)" #form="ngForm" novalidate>
      <div>
        Passenger ID:
        <input
          type="number"
          name="id"
          required
          #id="ngModel"
          [ngModel]="detail?.id"
        />
        <div *ngIf="id.errors?.required && id.dirty" class="error">
          Passenger ID is required
        </div>
      </div>
      <div>
        Passenger Name:
        <input
          type="text"
          name="fullname"
          required
          #fullname="ngModel"
          [ngModel]="detail?.fullname"
        />
        <div *ngIf="fullname.errors?.required && fullname.dirty" class="error">
          Passenger name is required
        </div>
      </div>
      <div>
        Passenger Checked:
        <label>
          <input
            type="checkbox"
            name="checkedIn"
            [ngModel]="detail?.checkedIn"
            (ngModelChange)="toggleCheckIn($event)"
          />
        </label>
      </div>

      <div *ngIf="form.value.checkedIn">
        Check in Date:
        <input
          type="number"
          name="checkInDate"
          [ngModel]="detail?.checkedInDate"
        />
      </div>

      <div>
        Luggage:
        <select name="baggage" [ngModel]="detail?.baggage">
          <option
            *ngFor="let item of baggage"
            [value]="item.key"
            [selected]="item.key === detail?.baggage"
          >
            {{ item.value }}
          </option>
        </select>
      </div>
      <button type="submit" [disabled]="form.invalid">Update passenger</button>
    </form>
  `
})
export class PassengerFormComponent implements OnInit {
  @Input()
  detail: Passenger;

  @Output()
  update: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  baggage: Baggage[] = [
    {
      key: "none",
      value: "No baggage"
    },
    {
      key: "hand-only",
      value: "Hand baggage"
    },
    {
      key: "hold-only",
      value: "Hold baggage"
    },
    {
      key: "hand-hold",
      value: "Hand and hold baggage"
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  toggleCheckIn(checkIn: boolean) {
    if (checkIn) {
      this.detail.checkedInDate = Date.now();
    }
  }

  handleSubmit(passenger: Passenger, isValid: boolean) {
    if(isValid) {
      this.update.emit(passenger);
    }
  }
}
