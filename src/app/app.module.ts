import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';

import { environment } from '../environments/environment';

import { NavbarComponent } from './navbar/navbar.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { FormModalComponent } from './modal/form-modal/form-modal.component';

import { Close16Module } from '@carbon/icons-angular/lib/close/16.js';
import { Menu32Module } from '@carbon/icons-angular/lib/menu/32.js';
import { NavbarItemComponent } from './navbar/navbar-item/navbar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SignUpComponent,
    LoginComponent,
    FormModalComponent,
    NavbarItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    Close16Module,
    Menu32Module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
