import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/public/login/login.component';
import { ResetAdminPasswordComponent } from './shared/components/reset-admin-password/reset-admin-password.component';
import { IsSignedInGuard } from './shared/guards/is-signed-in.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [IsSignedInGuard] },
  {
    path: 'home',
    loadChildren: () => import('./pages/private/home/home.module').then(
      (m) => m.HomeModule 
    )
  },
  // { path: 'reset-password', component: ResetAdminPasswordComponent},
  { path: '**', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
