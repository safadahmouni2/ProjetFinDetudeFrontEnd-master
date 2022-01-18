import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {UsersModels} from '../../../Models/Users.models';
import {MatDrawer} from '@angular/material/sidenav';
import {Observable, Subject} from 'rxjs';
import {Contact, Country} from '../../../../modules/admin/apps/contacts/contacts.types';
import {FormControl} from '@angular/forms';
import {UsersService} from '../../../Services/users.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../../../../modules/admin/apps/contacts/contacts.service';
import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '../../../../../@fuse/services/media-watcher';
import {CompteEtat} from '../../../Models/enum/CompteEtat';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnInit {

    users: Array<UsersModels>;
    userM: UsersModels;
    usermm: UsersModels;
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
                private _changeDetectorRef: ChangeDetectorRef,
                private _contactsService: ContactsService,
                @Inject(DOCUMENT) private _document: any,
                private _fuseMediaWatcherService: FuseMediaWatcherService,
                private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
        this.load = true;
        this.getUsers();
        this.getUserID();
    }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getUsers() {
        this.userService.getAllUser().subscribe((reslt) => {
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
    getUserID() {
        this.userService.getUserID( this.id ).subscribe((reslt) => {
            this.userM = reslt;
            console.log(reslt);
        });

    }
    selectToDelete(id){
        this.IDDelete=id;
    }
    onDelete(id) {

        let res: any;
        this.userService.deleteUser(id).subscribe((resltfe) => {
            res = resltfe;

            this.getUsers();


        });
        //localStorage.clear();
        }


        update(id){
            this.router.navigate(['/admin/Users/edit'],{queryParams:{'id':id}});
        }
    Bloque(id ) {
        let add: any;
        this.userService.Bloque(id).subscribe((reslt) => {
            add = reslt;

            this.getUsers();

        });
    }
    Active(id ) {
        let add: any;
        this.userService.Active(id).subscribe((reslt) => {
            add = reslt;

            this.getUsers();

        });
    }
}
