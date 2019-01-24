import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

// components
import {PassengerDashoardCounterComponent} from './passenger-dashboard/components/passenger-dashboard-counter/passenger-dashboard-counter-component';
import {PassengerDashboardDetailComponent} from './passenger-dashboard/components/passenger-dashboard-detail/passenger-dashboard-detail.component';
import {PassengerFormComponent} from './passenger-dashboard/components/passenger-form/passenger-form.component';

// containers
import { PassangerDashboardComponent } from './passenger-dashboard/passanger-dashboard.component';
import { PassengerViewerComponent } from './passenger-viewer/passenger-viewer.component';

// services
import { PassengerService } from "./passenger-dashboard/services/passenger.service";

const routes: Routes = [
  { path: 'passengers', children:[
    { path: '', component: PassangerDashboardComponent},
    { path: ':id', component: PassengerViewerComponent }
  ]}
];

@NgModule({
  declarations: [
    // containers
    PassangerDashboardComponent,
    PassengerViewerComponent,
    // components
    PassengerDashoardCounterComponent,
    PassengerDashboardDetailComponent,
    PassengerFormComponent
  ],
  imports: [CommonModule, HttpModule, FormsModule, RouterModule.forChild(routes)],
  providers: [PassengerService]
})
export class PassangerDashboardModule {}
