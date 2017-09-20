import {InjectionToken} from '@angular/core';

export const API_ENDPOINT = new InjectionToken<string>('API_ENDPOINT_TOKEN');
export const API_CONTACT = new InjectionToken<string>('API_GET_SINGLE_CONTACT_TOKEN');
export const API_CONTACTS = new InjectionToken<string>('API_GET_CONTACTS_TOKEN');
export const API_SEARCH_CONTACS = new InjectionToken<string>('API_SEARCH_CONTACS_TOKEN');
