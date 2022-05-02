import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SmartTableService } from 'src/app/shared/services/smart-table.service';
import { NbDialogService } from '@nebular/theme';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';

@NgModule({
  declarations: [
 
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [
    SmartTableService,
    NbDialogService,
    AuthGuard
  ]
})
export class HomeModule { }
