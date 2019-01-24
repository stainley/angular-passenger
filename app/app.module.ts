import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from "./app.component";
import { HomeComponent } from './home.component';
import {NotFoundComponent} from './not-found.component';

// Custom Module
import {PassangerDashboardModule } from './passanger-dashboard/containers/passanger-dashboard.module';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full'},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  declarations:[
    AppComponent, HomeComponent, NotFoundComponent
  ],
  bootstrap: [AppComponent],
  imports:[CommonModule, BrowserModule, PassangerDashboardModule, RouterModule.forRoot(routes)]
})
export class AppModule {}
