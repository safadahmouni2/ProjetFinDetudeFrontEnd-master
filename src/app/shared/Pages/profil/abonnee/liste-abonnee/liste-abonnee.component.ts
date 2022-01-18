import {ChangeDetectorRef, Component, Inject, OnInit, TemplateRef, ViewChild} from '@angular/core';
import{UsersModels} from '../../../../Models/Users.models';
import {MatDrawer} from '@angular/material/sidenav';
import {Observable, Subject} from 'rxjs';

import {FormControl} from '@angular/forms';

import {ActivatedRoute, Router} from '@angular/router';

import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '../../../../../../@fuse/services/media-watcher';

import {DomSanitizer} from '@angular/platform-browser';

import { ContactsService } from 'app/modules/admin/apps/contacts/contacts.service';
import { Contact, Country } from 'app/modules/admin/apps/contacts/contacts.types';

import {UsersService} from '../../../../Services/users.service';

import {ServiceRequestService} from '../../../../Services/service-request.service';
import {AbonneeService} from '../../../../Services/abonnee.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {ThemePalette} from '@angular/material/core';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-liste-abonnee',
  templateUrl: './liste-abonnee.component.html',
  styleUrls: ['./liste-abonnee.component.scss']
})
export class ListeAbonneeComponent implements OnInit {

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
    etatAbonne: boolean = false;
    buttonColor: ThemePalette = 'warn';
    public buttonName: string =  '';
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
      this.getAbonnees();
      this.getUserID();
      this.getEtatAbonne(this.id,this.userData.id);
  }
    profilDetails(id){
        this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

    }
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
/*  getUsers() {
      this.userService.getAllUser().subscribe((reslt) => {
          this.users = reslt;
          this.load=false;

      });
  }*/
    getEtatAbonne(id_prestataire,id_abonnee){
        this.abonneeService.getEtatAbonnement(this.userData.id,id_prestataire).subscribe((reslt) => {
            this.etatAbonne = reslt;
            if(this.etatAbonne){
                this.buttonName = 'Abonnée';
                this.buttonColor = 'accent';
            }
        });}
    getAbonnees() {
        this.abonneeService.getAllAbonnes(this.userData.id).subscribe((reslt) => {
            this.users = reslt;
            this.load=false;

            this.getEtatAbonne(this.id, this.userData.id);
            if(this.etatAbonne){
                this.buttonName = 'Abonnée';
                this.buttonColor = 'accent';
            }else{
                this.buttonName = 's\'abonner en retour';
                this.buttonColor = 'warn';
            }


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

      //localStorage.clear();



}

