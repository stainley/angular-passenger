import {Component} from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: `
    <div>
      Not found. Would you like to home page? <a routerLink="/">Home</a>
    </div>
  `
})
export class NotFoundComponent {

}
