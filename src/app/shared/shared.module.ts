

import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';

import {NgModule} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';

import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {FuseCardModule} from '../../@fuse/components/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import {ListComponent} from './Pages/competance-files/list/list.component';
import {DeleteComponent} from './Pages/competance-files/delete/delete.component';
import {DatailsComponent} from './Pages/competance-files/datails/datails.component';
import {EditComponent} from './Pages/competance-files/edit/edit.component';
import { ListeComponent } from './Pages/users/liste/liste.component';
import { DetailsComponent } from './Pages/users/details/details.component';
import { EditUserComponent} from './Pages/users/edit/edit.component';
import {DeleteUserComponent} from './Pages/users/delete/delete.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatNativeDateModule} from '@angular/material/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {FuseAlertModule} from '../../@fuse/components/alert';
import { AddGComponent } from './Pages/groups/add/add.component';
import {MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {QuillModule} from 'ngx-quill';
import {EditGComponent} from './Pages/groups/edit/edit.component';
import { AffectationComponent } from './Pages/groups/affectation/affectation.component';
import { AddDemComponent } from './Pages/service-request/add-dem/add-dem.component';
import { PostuleComponent } from './Pages/service-request/postule/postule.component';
import { LoginComponent } from './Pages/login/login.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './Services/auth-interceptor';
import { LogoutComponent } from './Pages/logout/logout.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ProfilComponent } from './Pages/profil/MesPub/profil.component';
import { MesDemandesComponent } from './Pages/profil/mes-demandes/mes-demandes.component';
import {MesPostuleComponent} from './Pages/profil/postule/postule.component';
import {AppModule} from '../app.module';
import {MatSnackBar} from '@angular/material/snack-bar';
import { DetailsProfilComponent } from './Pages/profil/details-profil/details-profil.component';
import {MalistComponent} from './Pages/competance-files/MesCVlist/Malist.component';
import {ListeAbonneeComponent} from './Pages/profil/abonnee/liste-abonnee/liste-abonnee.component';
import {AddAbonneeComponent} from './Pages/profil/abonnee/add-abonnee/add-abonnee.component';
import { AbonnementComponent } from './Pages/profil/abonnement/abonnement.component';
import { ChoixCompteComponent } from './Pages/register/choix-compte/choix-compte.component';
import {CompaniesComponent} from './Pages/companies/companies.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,

        FuseCardModule,
        MatIconModule,
        MatMenuModule,
        MatExpansionModule,
        MatInputModule,
        MatChipsModule,
        MatAutocompleteModule,
        MatDividerModule,
        MatButtonModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MarkdownModule.forRoot({}),
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDividerModule,
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatTabsModule,
        MatNativeDateModule,
        MatMomentDateModule,
        FuseAlertModule,
        MatDialogModule,
        QuillModule,


    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [

        AbonnementComponent,
        ListeAbonneeComponent,
        AddAbonneeComponent,
      ListComponent,
      DeleteComponent,
      DatailsComponent,
EditComponent,
ListeComponent,
        MalistComponent,

        EditUserComponent,
DetailsComponent,
        DeleteUserComponent,
        AddGComponent,
        EditGComponent,
        AffectationComponent,
        AddDemComponent,
        PostuleComponent,
        LoginComponent,
        LogoutComponent,
        RegisterComponent,
        ProfilComponent,
        MesDemandesComponent,
        MesPostuleComponent,
        DetailsProfilComponent,

        AbonnementComponent,
        ChoixCompteComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        MatSnackBar,

    ]
})
export class SharedModule
{
}

