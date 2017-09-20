import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Contact } from "../models/contact";
import { ActivatedRoute, Router } from "@angular/router";
import { ContactsService } from "../contacts.service";
import { Location } from "@angular/common";

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
    private location: Location) { }

  public ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.contact$ = this.contactsService.getContact(id);
  }

  public edit() {
    this.router.navigate(['edit'], {
      relativeTo: this.route
    });
  }
}
