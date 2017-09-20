import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactEditorComponent } from "./contact-editor/contact-editor.component";
import { ContactDetailViewComponent } from "./contact-detail-view/contact-detail-view.component";

export const APP_ROUTES = [
  {path: '', component: ContactsListComponent},
  {path: 'contact/:id', component: ContactDetailViewComponent},
  {path: 'contact/:id/edit', component: ContactEditorComponent},
  {path: '**', redirectTo: ''}
];
