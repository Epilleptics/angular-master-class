import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { API_ENDPOINT, API_CONTACT, API_CONTACTS, API_SEARCH_CONTACS } from './app.token';

import { Contact } from './models/contact';
import { ContactResponse, ContactsResponse } from './models/contact-response';

@Injectable()
export class ContactsService {

  constructor(
    private http: HttpClient,
    @Inject(API_ENDPOINT)
    private api_backend: string,
    @Inject(API_CONTACTS)
    private api_contacts: string,
    @Inject(API_CONTACT)
    private api_contact: string,
    @Inject(API_SEARCH_CONTACS)
    private api_search_contacts: string,
  ) {}

  public search(term: string): Observable<Array<Contact>> {
    return this.http.get<ContactsResponse>(`${this.api_backend}${this.api_search_contacts}?text=${term}`).map(response => response.items);
  }

  public getContacs(): Observable<Array<Contact>> {
    return this.http.get<ContactsResponse>(`${this.api_backend}${this.api_contacts}`).map(response => response.items);
  }

  public getContact(id: number|string): Observable<Contact> {
    return this.http.get<ContactResponse>(`${this.api_backend}${this.api_contact}${id}`).map(response => response.item);
  }

  public updateContact(contact: Contact) {
    return this.http.put(`${this.api_backend}${this.api_contact}${contact.id}`, contact);
  }
}
