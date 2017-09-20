import { Component, OnInit } from '@angular/core';
import {Contact} from 'app/models/contact';
import {ContactsService} from '../contacts.service';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/merge";
import "rxjs/add/operator/distinctUntilChanged";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/takeUntil";
import "rxjs/add/operator/switchMap";
import "rxjs/add/operator/delay";
import { ApplicationState } from "../state-management/index";
import { Store } from "@ngrx/store";
import { LoadContactsSuccessAction } from "app/state-management/contacts/contacts.actions";
import { ContactsQuery } from "../state-management/contacts/contacts.reducer";

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  public contacts$: Observable<Array<Contact>>;
  public terms$: Subject<string> = new Subject<string>();

  constructor(
    private contactService: ContactsService,
    private store: Store<ApplicationState>) {}

  public ngOnInit(): void {
    this.contacts$ = this.store.select(ContactsQuery.getContacts);

    const terms$ = this.terms$
                      .debounceTime(400)
                      .distinctUntilChanged()
                      .switchMap(term => this.contactService.search(term));
    const initial$ = this.contactService.getContacs()
                        .takeUntil(this.terms$);

    Observable.merge(terms$, initial$).subscribe((contacts) => {
      this.store.dispatch(
        new LoadContactsSuccessAction(contacts)
      );
    })
  }

  public trackByContactId(index: number, item: Contact): number|string {
    return item.id;
  }
}
