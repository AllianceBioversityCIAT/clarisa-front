import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './shared/services/auth.service';
import { EventBusService } from './shared/services/even-bus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'clarisa-frontend';
  show = false;
  eventBusSub?: Subscription;
  urls: String[]= [
    "/home",
    "/home/users",
    "/home/roles",
    "/home/permissions",
    "/home/institutions"
] ;

  constructor(
    private router: Router, 
    private authenticationService: AuthService,
    private eventBusService: EventBusService
    ) { 
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

  ngOnDestroy(): void {

  }

  ngOnInit(): void {
    this.eventBusSub = this.eventBusService.on('logout', () => {
      this.authenticationService.logout();
      location.reload();
    });
  }

}
