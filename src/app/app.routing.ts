import { Route } from '@angular/router';
import { LayoutComponent } from 'app/layout/layout.component';
import { InitialDataResolver } from 'app/app.resolvers';
import {CompetanceFilesComponent} from './shared/Pages/competance-files/Add/competance-files.component';
import {ListComponent} from './shared/Pages/competance-files/list/list.component';
import {DeleteComponent} from './shared/Pages/competance-files/delete/delete.component';
import {DatailsComponent} from './shared/Pages/competance-files/datails/datails.component';
import {EditComponent} from './shared/Pages/competance-files/edit/edit.component';
import {GroupsComponent} from './shared/Pages/groups/list/groups.component';
import {RolesComponent} from './shared/Pages/roles/list/roles.component';
import {UsersComponent} from './shared/Pages/users/add/users.component';
import {ListeComponent} from './shared/Pages/users/liste/liste.component';
import {DetailsComponent} from './shared/Pages/users/details/details.component';
import {EditUserComponent} from './shared/Pages/users/edit/edit.component';
import {DeleteUserComponent} from './shared/Pages/users/delete/delete.component';
import {AddGComponent} from './shared/Pages/groups/add/add.component';
import {PublicationsComponent} from './shared/Pages/publications/publications.component';
import {ServiceRequestComponent} from './shared/Pages/service-request/service-request.component';
import {LoginComponent} from './shared/Pages/login/login.component';
import {LogoutComponent} from './shared/Pages/logout/logout.component';
import {RegisterComponent} from './shared/Pages/register/register.component';
import {ProfilComponent} from './shared/Pages/profil/MesPub/profil.component';
import {MesPostuleComponent} from './shared/Pages/profil/postule/postule.component';
import {MesDemandesComponent} from './shared/Pages/profil/mes-demandes/mes-demandes.component';
import {DetailsProfilComponent} from './shared/Pages/profil/details-profil/details-profil.component';
import {MalistComponent} from './shared/Pages/competance-files/MesCVlist/Malist.component';

import { ListeAbonneeComponent } from './shared/Pages/profil/abonnee/liste-abonnee/liste-abonnee.component';

import {AddAbonneeComponent} from './shared/Pages/profil/abonnee/add-abonnee/add-abonnee.component';
import {AbonnementComponent} from './shared/Pages/profil/abonnement/abonnement.component';
import {ListNotificationComponent} from './layout/common/notifications/list-notification/list-notification.component';
import {ChoixCompteComponent} from './shared/Pages/register/choix-compte/choix-compte.component';
import {CompaniesComponent} from './shared/Pages/companies/companies.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Redirect signed in user to the '/dashboards/project'
    //
    // After the user signs in, the sign in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Auth routes for guests
    {
        path: '',
      //  canActivate: [NoAuthGuard],
      //  canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
           // {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.module').then(m => m.AuthConfirmationRequiredModule)},
          //  {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.module').then(m => m.AuthForgotPasswordModule)},
           // {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.module').then(m => m.AuthResetPasswordModule)},
            //{path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.module').then(m => m.AuthSignInModule)},
            {path: 'choix-compte', component: ChoixCompteComponent},
            {path:'sign-in',component: LoginComponent},
            {path: 'sign-up',component: RegisterComponent },
            {path: 'sign-up-companie', component: CompaniesComponent},
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
       // canActivate: [AuthGuard],
       // canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out',component: LogoutComponent },
           // {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.module').then(m => m.AuthUnlockSessionModule)}
        ]
    },

    // Landing routes
    {
        path: '',
        component  : LayoutComponent,
        data: {
            layout: 'empty'
        },
        children   : [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.LandingHomeModule)},
        ]
    },

    // Admin routes
    {
        path       : '',
      //  canActivate: [AuthGuard],
     //   canActivateChild: [AuthGuard],
        component  : LayoutComponent,
        resolve    : {
            initialData: InitialDataResolver,
        },
        children   : [

            // Dashboards
            { path: 'admin', children: [
                {path: '', loadChildren: () => import('app/modules/admin/dashboards/project/project.module').then(m => m.ProjectModule)},
                    { path: 'Users', children: [
                            {path:'add' ,component: UsersComponent },
                            {path:'liste' ,component: ListeComponent },
                            {path:'details' ,component: DetailsComponent },
                            {path:'edit' ,component: EditUserComponent },
                            {path:'delete' ,component: DeleteUserComponent},]},


                    { path: 'Groups', children: [
                            {path:'liste' ,component: GroupsComponent },
                             {path:'add' ,component: AddGComponent },
                             /* {path:'details' ,component: DatailsComponent },
                              {path:'edit' ,component: EditComponent },
                              {path:'affectation' ,component: AffectationComponent},*/

                        ]},
                    { path: 'Roles', children: [
                            {path:'liste' ,component: RolesComponent },
                            /*  {path:'liste' ,component: MalistComponent },
                              {path:'details' ,component: DatailsComponent },
                              {path:'edit' ,component: EditComponent },
                              {path:'affectation' ,component: AffectationComponent},*/

                        ]},
                ]},

            // Apps
            {path: 'apps', children: [
                    { path: 'CompetencesFiles', children: [
                            {path:'ajouter' ,component: CompetanceFilesComponent },
                            {path:'liste' ,component: ListComponent },
                            {path:'Maliste' ,component: MalistComponent },
                            {path:'details' ,component: DatailsComponent },
                            {path:'edit' ,component: EditComponent },
                            {path:'delete' ,component: DeleteComponent},

                        ]},
                    {path: 'allNotif',component: ListNotificationComponent},
                    {path: 'offre',component: ServiceRequestComponent},
                    {path: 'acceuil',component: PublicationsComponent},
                    {path: 'profil',component: ProfilComponent},
                    {path: 'profil/detail',component: DetailsProfilComponent},
                    {path: 'profil/abonnee',component: ListeAbonneeComponent},

                    {path: 'profil/abonnement',component: AbonnementComponent},
                    {path: 'profil/addAbonnee',component: AddAbonneeComponent},
                    {path: 'profil/mesDemandes',component: MesDemandesComponent},
                    {path: 'profil/postule',component: MesPostuleComponent},

                    {path: 'calendar', loadChildren: () => import('app/modules/admin/apps/calendar/calendar.module').then(m => m.CalendarModule)},
                {path: 'chat', loadChildren: () => import('app/modules/admin/apps/chat/chat.module').then(m => m.ChatModule)},
                {path: 'contacts', loadChildren: () => import('app/modules/admin/apps/contacts/contacts.module').then(m => m.ContactsModule)},
                {path: 'ecommerce', loadChildren: () => import('app/modules/admin/apps/ecommerce/ecommerce.module').then(m => m.ECommerceModule)},
                {path: 'file-manager', loadChildren: () => import('app/modules/admin/apps/file-manager/file-manager.module').then(m => m.FileManagerModule)},
                {path: 'help-center', loadChildren: () => import('app/modules/admin/apps/help-center/help-center.module').then(m => m.HelpCenterModule)},
                {path: 'mailbox', loadChildren: () => import('app/modules/admin/apps/mailbox/mailbox.module').then(m => m.MailboxModule)},
                {path: 'notes', loadChildren: () => import('app/modules/admin/apps/notes/notes.module').then(m => m.NotesModule)},
                {path: 'scrumboard', loadChildren: () => import('app/modules/admin/apps/scrumboard/scrumboard.module').then(m => m.ScrumboardModule)},
                {path: 'tasks', loadChildren: () => import('app/modules/admin/apps/tasks/tasks.module').then(m => m.TasksModule)},
            ]},

            // Pages
            {path: 'pages', children: [

                // Activities
                {path: 'activities', loadChildren: () => import('app/modules/admin/pages/activities/activities.module').then(m => m.ActivitiesModule)},

                // Authentication
             //   {path: 'authentication', loadChildren: () => import('app/modules/admin/pages/authentication/authentication.module').then(m => m.AuthenticationModule)},

                // Coming soon
             //   {path: 'coming-soon', loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.module').then(m => m.ComingSoonModule)},

                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
                    {path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.module').then(m => m.Error500Module)}
                ]},

                // Invoice
                {path: 'invoice', children: [
                    {path: 'printable', children: [
                        {path: 'compact', loadChildren: () => import('app/modules/admin/pages/invoice/printable/compact/compact.module').then(m => m.CompactModule)},
                        {path: 'modern', loadChildren: () => import('app/modules/admin/pages/invoice/printable/modern/modern.module').then(m => m.ModernModule)}
                    ]}
                ]},

                // Maintenance
                {path: 'maintenance', loadChildren: () => import('app/modules/admin/pages/maintenance/maintenance.module').then(m => m.MaintenanceModule)},

                // Pricing
                {path: 'pricing', children: [
                    {path: 'modern', loadChildren: () => import('app/modules/admin/pages/pricing/modern/modern.module').then(m => m.PricingModernModule)},
                    {path: 'simple', loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.module').then(m => m.PricingSimpleModule)},
                    {path: 'single', loadChildren: () => import('app/modules/admin/pages/pricing/single/single.module').then(m => m.PricingSingleModule)},
                    {path: 'table', loadChildren: () => import('app/modules/admin/pages/pricing/table/table.module').then(m => m.PricingTableModule)}
                ]},


                // Profile
                {path: 'profile', loadChildren: () => import('app/modules/admin/pages/profile/profile.module').then(m => m.ProfileModule)},

                // Settings
                {path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.module').then(m => m.SettingsModule)},
            ]},

            // User interface
            {path: 'ui', children: [

                // Angular Material
                {path: 'angular-material', loadChildren: () => import('app/modules/admin/ui/angular-material/angular-material.module').then(m => m.AngularMaterialModule)},

                // TailwindCSS
                {path: 'tailwindcss', loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.module').then(m => m.TailwindCSSModule)},

                // Advanced search
                {path: 'advanced-search', loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.module').then(m => m.AdvancedSearchModule)},
// no
                // Animations
                {path: 'animations', loadChildren: () => import('app/modules/admin/ui/animations/animations.module').then(m => m.AnimationsModule)},

                 // Cards
                {path: 'cards', loadChildren: () => import('app/modules/admin/ui/cards/cards.module').then(m => m.CardsModule)},

                // Colors
                {path: 'colors', loadChildren: () => import('app/modules/admin/ui/colors/colors.module').then(m => m.ColorsModule)},

                // Datatable
                {path: 'datatable', loadChildren: () => import('app/modules/admin/ui/datatable/datatable.module').then(m => m.DatatableModule)},

                // Forms
                {path: 'forms', children: [
                    {path: 'fields', loadChildren: () => import('app/modules/admin/ui/forms/fields/fields.module').then(m => m.FormsFieldsModule)},
                    {path: 'layouts', loadChildren: () => import('app/modules/admin/ui/forms/layouts/layouts.module').then(m => m.FormsLayoutsModule)},
                    {path: 'wizards', loadChildren: () => import('app/modules/admin/ui/forms/wizards/wizards.module').then(m => m.FormsWizardsModule)}
                ]},

                // Icons
                {path: 'icons', loadChildren: () => import('app/modules/admin/ui/icons/icons.module').then(m => m.IconsModule)},

                // Page layouts
                {path: 'page-layouts', loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.module').then(m => m.PageLayoutsModule)},

                // Typography
                {path: 'typography', loadChildren: () => import('app/modules/admin/ui/typography/typography.module').then(m => m.TypographyModule)}
            ]},



            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.module').then(m => m.Error404Module)},
            {path: '**', redirectTo: '404-not-found'}
        ]
    }
];
