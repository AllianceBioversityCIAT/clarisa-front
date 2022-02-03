import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  items = [
    { title: 'Logout' },
  ];

  constructor(private nbMenuService: NbMenuService, private router: Router, private authenticationService: AuthService) {
  }

  ngOnInit(): void {
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

}
