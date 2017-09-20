import { Action } from "@ngrx/store";
import { Contact } from "../../models/contact";

export enum ContactsActionTypes {
  LOAD_CONTACT_SUCCESS = '[Contact] loaded successfully',
  SELECT_CONTACT = '[Contact] selected',
  EDIT_CONTACT = '[Contact] edited',
  ADD_CONTACT = '[Contact] added'
}

abstract class ContactsAction implements Action {
  readonly abstract type: ContactsActionTypes;

  public is<T>(type: ContactsActionTypes): this is T {
    return this.type === type;
  }
}

export class LoadContactsSuccessAction extends ContactsAction{
  readonly type = ContactsActionTypes.LOAD_CONTACT_SUCCESS;

  constructor(public readonly payload: Array<Contact>) {
    super();
  }
}

export class SelectContactAction extends ContactsAction {
  readonly type = ContactsActionTypes.SELECT_CONTACT;

  constructor(public readonly payload: number) {
    super();
  }
}

export class EditContactAction extends ContactsAction {
  readonly type = ContactsActionTypes.EDIT_CONTACT;

  constructor(public readonly payload: Contact) {
    super();
  }
}

export class AddContactAction extends ContactsAction {
  readonly type = ContactsActionTypes.ADD_CONTACT;

  constructor(public readonly payload: Contact) {
    super();
  }
}

export type ContactsActions = LoadContactsSuccessAction | SelectContactAction | EditContactAction | AddContactAction;
