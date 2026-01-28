import { Routes } from '@angular/router';
import { ListePollutionsComponent } from './liste-pollutions/liste-pollutions.component';
import { DetailsPollutionComponent } from './details-pollution/details-pollution.component';
import { AddPollutionComponent } from './add-pollution/add-pollution.component';
import { EditPollutionComponent } from './edit-pollution/edit-pollution.component';
import { AddUtilisateurComponent } from './add-utilisateur/add-utilisateur.component';
import { ListeUtilisateursComponent } from './liste-utilisateurs/liste-utilisateurs.component';
import { LoginComponent } from './login/login.component';
import { FavoritesListComponent } from './favorites-list/favorites-list.component';

export const routes: Routes = [
    { path: '', redirectTo: 'utilisateurs/add', pathMatch: 'full' },

    { path: 'pollutions', component: ListePollutionsComponent },
    { path: 'pollutions/add', component: AddPollutionComponent },
    { path: 'pollutions/:id', component: DetailsPollutionComponent },
    { path: 'pollutions/edit/:id', component: EditPollutionComponent },
    { path: 'favorites', component: FavoritesListComponent },

    { path: 'utilisateurs/add', component: AddUtilisateurComponent },
    { path: 'utilisateurs', component: ListeUtilisateursComponent },
    { path: 'login', component: LoginComponent }
];

