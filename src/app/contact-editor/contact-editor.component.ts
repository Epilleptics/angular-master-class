import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ContactsService } from "../contacts.service";
import { Contact } from "../models/contact";
import { Location } from "@angular/common";
import { Observable } from "rxjs/Observable";
import { ApplicationState } from "../state-management/index";
import { Store } from "@ngrx/store";
import { EditContactAction, SelectContactAction } from "../state-management/contacts/contacts.actions";
import { ContactsQuery } from "../state-management/contacts/contacts.reducer";

@Component({
  selector: 'trm-contact-editor',
  templateUrl: './contact-editor.component.html',
  styleUrls: ['./contact-editor.component.css']
})
export class ContactEditorComponent implements OnInit {

  private contact$: Observable<Contact>;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private location: Location,
    private store: Store<ApplicationState>) {
  }

  private back() {
    this.location.back();
  }

  public ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.contact$ = this.store.select(ContactsQuery.getSelectedContact);
    this.store.dispatch(
      new SelectContactAction(id)
    );
  }

  public save(contact: Contact) {
    this.contactsService.updateContact(contact).subscribe(_ => {
      this.store.dispatch(
        new EditContactAction(contact)
      );
      this.back();
    });
  }
}
