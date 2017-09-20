import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ContactsService } from "../contacts.service";
import { Contact } from "../models/contact";
import { Location } from "@angular/common";
import { Observable } from "rxjs/Observable";
import { EventBusService } from "../event-bus.service";
import { APP_TITLE_CHANGE } from "../app.events";

@Component({
  selector: 'trm-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {

  private contact$: Observable<Contact>;

  constructor(
    private eventBusService: EventBusService,
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private location: Location) { }

  private back() {
    this.location.back();
  }

  public ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.contact$ = this.contactsService.getContact(id).map((contact) => {
      this.eventBusService.emit(APP_TITLE_CHANGE, 'EDITING ' + contact.name.toUpperCase());
      return contact;
    });
  }

  public save(contact: Contact) {
    this.contactsService.updateContact(contact).subscribe(() => this.back());
  }
}
