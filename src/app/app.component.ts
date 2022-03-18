import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clarisa-frontend';
  show = false;

  constructor(private router: Router) { 
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if (event.url == "/home" || event.url == "/home/users" || event.url == "/home/roles" || event.url == "/home/permissions") {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    });
  }
}
