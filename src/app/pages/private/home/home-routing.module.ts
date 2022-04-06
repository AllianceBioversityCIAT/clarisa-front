import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { IsSignedInGuard } from 'src/app/shared/guards/is-signed-in.guard';
import { HomeComponent } from './home.component';
import { InstitutionsComponent } from './sections/institutions/institutions.component';
import { RolesComponent } from './sections/roles/roles.component';
import { UsersComponent } from './sections/users/users.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      title: 'Home',
      authGuardPipe: IsSignedInGuard
    }
  },
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'roles',
    component: RolesComponent
  },
  {
    path: 'institutions',
    component: InstitutionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
