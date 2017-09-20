import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactEditorComponent } from "./contact-editor/contact-editor.component";
import { ContactDetailViewComponent } from "./contact-detail-view/contact-detail-view.component";
import { ContactExistsGuard } from "./contact-exists.guard";

export const APP_ROUTES = [
  {path: '', component: ContactsListComponent},
  {path: 'contact/:id', component: ContactDetailViewComponent, canActivate: [ContactExistsGuard]},
  {path: 'contact/:id/edit', component: ContactEditorComponent, canActivate: [ContactExistsGuard]},
  {path: '**', redirectTo: ''}
];
