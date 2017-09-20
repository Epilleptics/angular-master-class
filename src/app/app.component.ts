import { Component, OnInit } from '@angular/core';

import {  } from '@bas/'
import { EventBusService } from "./event-bus.service";
import { APP_TITLE_CHANGE } from "./app.events";

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit{

  public title;

  constructor(private eventBusService: EventBusService) {}

  ngOnInit(): void {
    this.eventBusService.observe(APP_TITLE_CHANGE).subscribe(title => this.title = title);
  }
}
