import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clarisa-frontend';
  show = true;

  constructor(private router: Router) { 
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
          this.show = event.url != "/login";
      }
    });
  }
}
