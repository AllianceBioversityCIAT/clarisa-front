import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/private/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  NbThemeModule, 
  NbLayoutModule, 
  NbInputModule, 
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule, 
  NbCardModule,
  NbButtonModule,
  NbIconModule,
  NbFormFieldModule,
  NbUserModule,
  NbContextMenuModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbInputModule,
    NbDatepickerModule,
    NbDialogModule,
    NbMenuModule.forRoot(),
    NbSidebarModule,
    NbToastrModule,
    NbWindowModule,
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
    NbContextMenuModule,
    NbEvaIconsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
