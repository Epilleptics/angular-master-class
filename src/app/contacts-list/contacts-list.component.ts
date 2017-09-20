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
import { EventBusService } from "../event-bus.service";
import { APP_TITLE_CHANGE } from "../app.events";

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
export class ContactsListComponent implements OnInit {
  public contacts$: Observable<Array<Contact>>;
  public terms$: Subject<string> = new Subject<string>();

  constructor(private contactService: ContactsService, private eventBusService: EventBusService) {}

  public ngOnInit(): void {
    this.eventBusService.emit(APP_TITLE_CHANGE, 'CONTACTS');
    const terms$ = this.terms$
                      .debounceTime(400)
                      .distinctUntilChanged()
                      .switchMap(term => this.contactService.search(term));
    const initial$ = this.contactService.getContacs()
                        .takeUntil(this.terms$);

    this.contacts$ = Observable.merge(terms$, initial$);
  }

  public trackByContactId(index: number, item: Contact): number|string {
    return item.id;
  }
}
