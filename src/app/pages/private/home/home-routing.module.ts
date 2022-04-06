import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { IsSignedInGuard } from 'src/app/shared/guards/is-signed-in.guard';
import { HomeComponent } from './home.component';
import { InstitutionsComponent } from './sections/institutions/institutions.component';
import { RolesComponent } from './sections/roles/roles.component';
import { UsersComponent } from './sections/users/users.component';
import { PermissionsComponent } from './sections/permissions/permissions.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    canActivate: [AuthGuard],
    pathMatch: 'full',
    data: {
      title: 'Home',
      // authGuardPipe: IsSignedInGuard
    },
    redirectTo: 'users'
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'institutions',
    component: InstitutionsComponent
  },
  {
    path: 'roles',
  component: RolesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'permissions',
    component: PermissionsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
