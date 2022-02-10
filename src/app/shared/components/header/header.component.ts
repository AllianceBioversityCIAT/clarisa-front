import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../../services/layout.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  items = [
    { title: 'Logout' },
  ];

  constructor(private nbMenuService: NbMenuService, private router: Router, private authenticationService: AuthService, private sidebarService: NbSidebarService, private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.fullName = this.authenticationService.currentUserValue['first_name'] + ' ' + this.authenticationService.currentUserValue['last_name'];
    this.email = this.authenticationService.currentUserValue['email'];

    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'my-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        switch (title) {
          case 'Logout':
            this.authenticationService.logout();
            this.router.navigate(['/login']);
            break;

          default:
            break;
        }
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();
    return false;
  }

}
