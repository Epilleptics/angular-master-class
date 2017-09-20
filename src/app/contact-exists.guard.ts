import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApplicationState } from "./state-management/index";
import { Store } from "@ngrx/store";
import { ContactsService } from "./contacts.service";
import { AddContactAction, SelectContactAction } from "./state-management/contacts/contacts.actions";
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/switchMap';
import { Contact } from "./models/contact";
import "rxjs/add/observable/of";
import "rxjs/add/operator/do";
import { ContactsQuery } from "./state-management/contacts/contacts.reducer";

@Injectable()
export class ContactExistsGuard implements CanActivate {

  constructor(
    private store: Store<ApplicationState>,
    private contactsService: ContactsService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const resolveOrAddContactToList = (loaded: boolean) => {
      let addContactToList = (contact: Contact) => {
        this.store.dispatch(new AddContactAction(contact));
      };

      return loaded ? Observable.of(true) : this.contactsService.getContact(contactId).do(addContactToList).map(contact => !!contact);
    };

    let contactId = parseInt(next.paramMap.get('id'));
    this.store.dispatch(new SelectContactAction(contactId));

    return this.store.select(ContactsQuery.getLoaded).take(1).switchMap(resolveOrAddContactToList);
  }
}
