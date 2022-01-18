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
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  
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

  ngOnInit() {
  
  }

}
