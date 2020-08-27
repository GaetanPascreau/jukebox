import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { CDListComponent } from './cd-list/cd-list.component';
import { SingleCDComponent } from './CD-list/single-cd/single-cd.component';
import { CDFormComponent } from './CD-list/cd-form/cd-form.component';
import { HeaderComponent } from './header/header.component';
import {CDsService} from './services/cds.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  {path:'auth/signup', component: SignupComponent},
  {path:'auth/signin', component: SigninComponent},
  {path:'cds', canActivate: [AuthGuardService], component: CDListComponent},
  {path:'cds/new', canActivate: [AuthGuardService], component: CDFormComponent},
  {path:'cds/view/:id', canActivate: [AuthGuardService], component: SingleCDComponent},
  {path:'', redirectTo: 'cds', pathMatch: 'full'},
  {path:'**', redirectTo: 'cds'}
]

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CDListComponent,
    SingleCDComponent,
    CDFormComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    AuthService,
    CDsService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
