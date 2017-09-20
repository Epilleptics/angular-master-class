import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ContactsService } from "../contacts.service";
import { Contact } from "../models/contact";
import { Location } from "@angular/common";
import { Observable } from "rxjs/Observable";

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
    private location: Location) { }

  private back() {
    this.location.back();
  }

  public ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.contact$ = this.contactsService.getContact(id);
  }

  public save(contact: Contact) {
    this.contactsService.updateContact(contact).subscribe(() => this.back());
  }
}
