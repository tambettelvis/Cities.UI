import {InjectionToken, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CitiesRowComponent } from './components/cities-row/cities-row.component';
import {environment} from "../environments/environment.local";
import { PaginationComponent } from './components/pagination/pagination.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MaterialModule} from "./material.module";
import {Environment} from "../environments/environment";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginDialogComponent} from "./components/login-dialog/login-dialog.component";


export const ENVIRONMENT: InjectionToken<Environment> =
  new InjectionToken<Environment>('');

@NgModule({
  declarations: [
    AppComponent,
    CitiesRowComponent,
    PaginationComponent,
    LoginDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
