import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    // canActivate: [],
    pathMatch: 'full',
    data: {
      title: 'Home',
      // authGuardPipe: 
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
