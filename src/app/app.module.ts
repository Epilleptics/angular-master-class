import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from "@angular/forms";

import { API_CONTACT, API_CONTACTS, API_ENDPOINT, API_SEARCH_CONTACS } from './app.token';
import { APP_ROUTES } from 'app/app.routes';

import { ContactsAppComponent } from './app.component';
import { ContactsService } from './contacts.service';
import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactEditorComponent } from './contact-editor/contact-editor.component';
import { ContactDetailViewComponent } from './contact-detail-view/contact-detail-view.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import { EventBusService } from "./event-bus.service";

@NgModule({
  providers: [
    ContactsService,
    EventBusService,
    {provide: API_ENDPOINT, useValue: 'http://localhost:4201'},
    {provide: API_CONTACTS, useValue: '/api/contacts'},
    {provide: API_CONTACT, useValue: '/api/contacts/'},
    {provide: API_SEARCH_CONTACS, useValue: '/api/search'},
  ],
  declarations: [ContactsAppComponent, ContactsListComponent, ContactDetailComponent, ContactEditorComponent, ContactDetailViewComponent, TabsComponent, TabComponent],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    FormsModule,
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  bootstrap: [ContactsAppComponent]
})
export class ContactsModule {}
