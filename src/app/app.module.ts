import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/public/login/login.component';
import { HomeComponent } from './pages/private/home/home.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DialogAddUserPromptComponent } from './shared/components/dialog-add-user-prompt/dialog-add-user-prompt.component';
import { DialogDeleteUserPromptComponent } from './shared/components/dialog-delete-user-prompt/dialog-delete-user-prompt.component';
import { DialogEditUserPromptComponent } from './shared/components/dialog-edit-user-prompt/dialog-edit-user-prompt.component';
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
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BasicAuthInterceptor } from './shared/helpers/basic-auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    DialogAddUserPromptComponent,
    DialogDeleteUserPromptComponent,
    DialogEditUserPromptComponent,
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
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbMenuModule.forRoot(),
    NbSidebarModule.forRoot(),
    NbToastrModule.forRoot(),
    NbWindowModule.forRoot(),
    NbCardModule,
    NbButtonModule,
    NbIconModule,
    NbFormFieldModule,
    NbUserModule,
    NbContextMenuModule,
    NbEvaIconsModule,
    Ng2SmartTableModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
