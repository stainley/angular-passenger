import {Component, Input, Output, EventEmitter, OnChanges} from '@angular/core';
import { Passenger } from '../../models/passanger.interfaces';

@Component({
  selector: "app-passenger-dashboard-detail",
  styleUrls: ["passenger-dashboard-detail.component.scss"],
  template: `
    <div>
      <span
        class="status"
        [ngStyle]="{
          backgroundColor: detail.checkedIn ? '#2ecc71' : '#c0392b'
        }"
      >
      </span>
      <div *ngIf="editing">
        <input
          type="text"
          [value]="detail.fullname"
          (input)="onNameChange(name.value)"
          #name
        />
      </div>

      <div *ngIf="!editing">
        Passenger: {{ detail.fullname }} Checkin: {{ detail.checkedIn }}
      </div>

      <button (click)="toggleEdit()">{{ editing ? "Done" : "Edit" }}</button>
      <button (click)="onRemove()">Remove</button>
      <button (click)="goToPassenger()">View</button>
    </div>
  `
})
export class PassengerDashboardDetailComponent implements OnChanges {
  @Input()
  detail: Passenger;

  editing: boolean = false;
  @Output()
  edit: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  remove: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  @Output()
  view: EventEmitter<Passenger> = new EventEmitter<Passenger>();

  ngOnChanges(changes): void {
    if (changes.detail) {
      this.detail = Object.assign({}, changes.detail.currentValue);
    }
  }

  onNameChange(value: string) {
    this.detail.fullname = value;
  }

  toggleEdit() {
    if (this.editing) {
      this.edit.emit(this.detail);
    }
    this.editing = !this.editing;
  }

  onRemove() {
    this.remove.emit(this.detail);
  }

  goToPassenger() {
    this.view.emit(this.detail);
  }
}
