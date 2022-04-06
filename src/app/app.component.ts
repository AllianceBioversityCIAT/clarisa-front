import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'clarisa-frontend';
  show = false;
  urls: String[]= ["/home",
  "/home/users",
  "/home/roles",
  "/home/permissions",
  "/home/institutions"
];

  constructor(private router: Router, private authenticationService: AuthService) { 
    this.router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if ((this.urls.includes(event.url)) && this.authenticationService.isLoggedIn) {
          this.show = true;
        } else {
          this.show = false;
        }
      }
    });
  }
}
