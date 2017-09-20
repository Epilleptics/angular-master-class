import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from "@angular/material";
import { FlexLayoutModule } from "@angular/flex-layout";

import {  appStoreFactory } from './store/app-store';
import { AppComponent } from "./app.component";
import { DashboardComponent } from "./components/dashboard.component";
import { VoterComponent } from "./components/voter.component";
import { StatusComponent } from "./components/status.component";
import { APP_STORE } from "./app-tokens";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    VoterComponent,
    StatusComponent
  ],
  providers: [
    {provide: APP_STORE, useFactory: appStoreFactory}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

