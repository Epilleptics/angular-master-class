import { Action } from "@ngrx/store";
import { Contact } from "../../models/contact";

export enum ContactsActionTypes {
  LOAD_CONTACT_SUCCESS = '[Contact] loaded successfully'
}

export class LoadContactsSuccessAction implements Action {
  readonly type: string = ContactsActionTypes.LOAD_CONTACT_SUCCESS;

  constructor(public readonly payload: Array<Contact>) {}
}

export type ContactsActions = LoadContactsSuccessAction;
