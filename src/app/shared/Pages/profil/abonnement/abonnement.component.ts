import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UsersModels} from '../../../Models/Users.models';
import {MatDrawer} from '@angular/material/sidenav';
import {Observable, Subject} from 'rxjs';
import {Contact, Country} from '../../../../modules/admin/apps/contacts/contacts.types';
import {FormControl} from '@angular/forms';
import {UsersService} from '../../../Services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceRequestService} from '../../../Services/service-request.service';
import {AbonneeService} from '../../../Services/abonnee.service';
import {ContactsService} from '../../../../modules/admin/apps/contacts/contacts.service';
import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '../../../../../@fuse/services/media-watcher';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-abonnement',
  templateUrl: './abonnement.component.html',
  styleUrls: ['./abonnement.component.scss']
})
export class AbonnementComponent implements OnInit {
    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = {id: this.decodedToken.id};
    user: UsersModels;
    users: Array<UsersModels>;
    userM: UsersModels;

    load=false;
    selectedProject: string = 'ACME Corp. Backend App';
    data: any;
    @ViewChild('matDrawer', {static: true}) matDrawer: MatDrawer;
    id: any;
    IDDelete: any;
    contacts$: Observable<Contact[]>;

    contactsCount: number = 0;
    contactsTableColumns: string[] = ['name', 'email', 'phoneNumber', 'job'];
    countries: Country[];
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl = new FormControl();
    selectedContact: Contact;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    constructor(private userService: UsersService,private router: Router,private _router: Router,
                private _activatedRoute: ActivatedRoute,
                private requestService: ServiceRequestService,
                private _changeDetectorRef: ChangeDetectorRef,
                private  abonneeService: AbonneeService,
                private _contactsService: ContactsService,
                @Inject(DOCUMENT) private _document: any,
                private _fuseMediaWatcherService: FuseMediaWatcherService,
                private sanitizer: DomSanitizer ) { }

    ngOnInit(): void {
        this.load = true;
        this.getAbonnements();
    }
    profilDetails(id){
        this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

    }
    desabonner(){
        let res: any;
        this.abonneeService.deleteAbonne(this.userData.id, this.id).subscribe((resltfe) => {
            res = resltfe;
        });
    }
    getAbonnements() {

        this.abonneeService.getAllAbonnement(this.userData.id).subscribe((reslt) => {
            this.users = reslt;
            this.load=false;

        });
    }
    onBackdropClicked(): void
    {
        // Go back to the list
        this._router.navigate(['./'], {relativeTo: this._activatedRoute});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type


    //localStorage.clear();



}

