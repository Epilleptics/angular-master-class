import { Contact } from "../../models/contact";
import {
  AddContactAction, ContactsActions, ContactsActionTypes, EditContactAction, LoadContactsSuccessAction,
  SelectContactAction
} from "./contacts.actions";
import { ApplicationState } from "../index";
import { createSelector } from "@ngrx/store";

export interface ContactsState {
  list: Array<Contact>;
  selectedContactId: number | null;
  loaded: boolean
}

const INITIAL_STATE: ContactsState = {
  list: [],
  selectedContactId: null,
  loaded: false
};

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions): ContactsState {
  if(action.is) {
    if (action.is<LoadContactsSuccessAction>(ContactsActionTypes.LOAD_CONTACT_SUCCESS)) {
      return {...state, list: action.payload, loaded: true};
    }
    if (action.is<SelectContactAction>(ContactsActionTypes.SELECT_CONTACT)) {
      return {...state, selectedContactId: action.payload};
    }
    if (action.is<AddContactAction>(ContactsActionTypes.ADD_CONTACT)) {
      let findInList = (contact) => {
        return contact.id == action.payload.id;
      };
      let inStore = state.list.some(findInList);

      return {
        ...state,
        list: !inStore ? [...state.list, action.payload] :
          [...state.list]
      };
    }
    if (action.is<EditContactAction>(ContactsActionTypes.EDIT_CONTACT)) {
      let updatedList = state.list.map(contact => {
        return contact.id === (action.payload as { id: number | string }).id ? {...contact, ...action.payload as {}} : contact;
      });
      return {...state, list: (updatedList as Array<any>)};
    }
  }
  return state;
}

export namespace ContactsQuery {
  export const getContacts = state => state.contacts.list;
  export const getLoaded = state => state.contacts.loaded;
  export const getSelectedContact = createSelector(getContacts, getLoaded, (contacts: Array<Contact>, selectedContactId: number) => {
      let contact = contacts.find(c => c.id == selectedContactId);
      return Object.assign({}, contact);
  });
}
