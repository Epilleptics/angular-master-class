import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class EventBusService {

  private messages$ = new Subject<EventBusArgs>();

  constructor() { }

  public emit(eventType: string, data: any) {
    this.messages$.next({
      type: eventType,
      data: data
    });
  }

  public observe(eventType: string) {
    return this.messages$.filter(args => args.type === eventType).map(args => args.data);
  }


}

interface EventBusArgs {
  type: string;
  data: any;

}
