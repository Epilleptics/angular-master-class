import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Contact } from "../models/contact";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactsService } from "../contacts.service";
import { Location } from "@angular/common";
import { ApplicationState } from "../state-management/index";
import { Store } from "@ngrx/store";
import { SelectContactAction } from "../state-management/contacts/contacts.actions";
import { ContactsQuery } from "../state-management/contacts/contacts.reducer";

@Component({
  selector: 'trm-contact-detail-view',
  templateUrl: './contact-detail-view.component.html',
  styleUrls: ['./contact-detail-view.component.css']
})
export class ContactDetailViewComponent implements OnInit {

  public contact$: Observable<Contact>;

  constructor(
    private route: ActivatedRoute,
    private contactsService: ContactsService,
    private router: Router,
    private location: Location,
    private store: Store<ApplicationState>) { }

  public ngOnInit() {
    let id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.store.dispatch(
      new SelectContactAction(id)
    );

    this.contact$ = this.store.select(ContactsQuery.getSelectedContact);
  }

  public edit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route
    });
  }
}
