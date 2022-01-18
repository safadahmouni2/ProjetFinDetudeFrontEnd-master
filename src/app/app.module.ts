import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { FuseModule } from '@fuse';
import { FuseConfigModule } from '@fuse/services/config';
import { FuseMockApiModule } from '@fuse/lib/mock-api';
import { CoreModule } from 'app/core/core.module';
import { appConfig } from 'app/core/config/app.config';
import { mockApiServices } from 'app/mock-api';
import { LayoutModule } from 'app/layout/layout.module';
import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MatChipsModule} from '@angular/material/chips';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldControl, MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {CommonModule} from '@angular/common';
import {CompetanceFilesComponent} from './shared/Pages/competance-files/Add/competance-files.component';
import {CompaniesComponent} from './shared/Pages/companies/companies.component';
import {ExperiencesComponent} from './shared/Pages/experiences/experiences.component';
import {GroupsComponent} from './shared/Pages/groups/list/groups.component';
import {PicturesComponent} from './shared/Pages/pictures/pictures.component';
import {LanguagesComponent} from './shared/Pages/languages/languages.component';
import {PublicationsComponent} from './shared/Pages/publications/publications.component';
import {RolesComponent} from './shared/Pages/roles/list/roles.component';
import {ServiceRequestComponent} from './shared/Pages/service-request/service-request.component';
import {SkillsComponent} from './shared/Pages/skills/skills.component';
import {StatusComponent} from './shared/Pages/status/status.component';
import {VideosComponent} from './shared/Pages/videos/videos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {EditComponent} from './shared/Pages/competance-files/edit/edit.component';
import {FuseAlertModule} from '../@fuse/components/alert';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import {UsersComponent} from './shared/Pages/users/add/users.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSidenavModule} from '@angular/material/sidenav';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {FuseNavigationModule} from '../@fuse/components/navigation';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import {FuseCardModule} from '../@fuse/components/card';
import {MatDialogModule} from '@angular/material/dialog';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {PickerModule} from '@ctrl/ngx-emoji-mart';
import {MatSnackBar} from '@angular/material/snack-bar';
const routerConfig: ExtraOptions = {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy       : PreloadAllModules
};

// @ts-ignore
@NgModule({
    declarations: [
        AppComponent,
        CompetanceFilesComponent,
        CompaniesComponent,
        ExperiencesComponent,
        GroupsComponent,
        LanguagesComponent,
        PicturesComponent,
        PublicationsComponent,
        RolesComponent,
        ServiceRequestComponent,
        SkillsComponent,
        StatusComponent,
        StatusComponent,
        UsersComponent,
        VideosComponent,


    ],
    imports: [
        BrowserModule,

        HttpClientModule,

        RouterModule,
        MatChipsModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatAutocompleteModule,
        MatIconModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),

        // Fuse, FuseConfig & FuseMockAPI
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        FuseMockApiModule.forRoot(mockApiServices),

        // Core module of your application
        CoreModule,

        // Layout module of your application
        LayoutModule,

        // 3rd party modules that require global configuration via forRoot
        MarkdownModule.forRoot({}),
        MatDatepickerModule,
        MatInputModule,
        MatSelectModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatRadioModule,
        MatCheckboxModule,
        MatDividerModule,
        FuseAlertModule,
        MatMenuModule,
        MatTabsModule,
        MatTooltipModule,
        MatSidenavModule,
        DragDropModule,
        FuseNavigationModule,
        MatProgressBarModule,
        MatExpansionModule,
        FuseCardModule,
        MatDialogModule,
        ScrollingModule,
        PickerModule,
    ],
    exports: [
        AppComponent
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule
{
}
