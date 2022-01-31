import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SmartTableService } from 'src/app/shared/services/smart-table.service';
import { NbDialogService } from '@nebular/theme';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ],
  providers: [
    SmartTableService,
    NbDialogService,
  ]
})
export class HomeModule { }
