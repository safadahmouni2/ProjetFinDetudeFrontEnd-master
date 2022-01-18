import {Component, HostListener, OnInit} from '@angular/core';
import {DemandeModule} from '../../Models/demande.module';
import {ServiceRequestService} from '../../Services/service-request.service';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {AddGComponent} from '../groups/add/add.component';
import {AddDemComponent} from './add-dem/add-dem.component';
import {MatDialog} from '@angular/material/dialog';
import {CompetanceFilesComponent} from '../competance-files/Add/competance-files.component';
import {PostuleComponent} from './postule/postule.component';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UsersService} from '../../Services/users.service';
import {UsersModels} from '../../Models/Users.models';
import {PublicationsService} from '../../Services/publications.service';
import {PublictionModule} from '../../Models/publiction.module';

@Component({
  selector: 'app-service-request',
  templateUrl: './service-request.component.html',
  styleUrls: ['./service-request.component.css']
})
export class ServiceRequestComponent implements OnInit {
    demL: Array<DemandeModule>=[];
    dem: DemandeModule;
    n=0;
    s=4;
    isShow: boolean;
    topPosToStartShowing = 100;
    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = { id: this.decodedToken.id,
        name_user: this.decodedToken.name_user,
        first_name: this.decodedToken.first_name,
        email: this.decodedToken.email,
        title: this.decodedToken.title,
        login: this.decodedToken.login,
        pwd: this.decodedToken.pwd,
        gender: this.decodedToken.gender,
        age: this.decodedToken.age,
        phone: this.decodedToken.phone,
        date_birth: this.decodedToken.date_birth,
        pays: this.decodedToken.pays,
    };
    user: UsersModels;
    pubL: Array<PublictionModule>=[];

    constructor(private usersService: UsersService,private _matDialog: MatDialog,
                private requestService: ServiceRequestService,
                private publicationsService: PublicationsService,
                private router: Router,private sanitizer: DomSanitizer) { }
    @HostListener('window:scroll')
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    checkScroll() {

        // window의 scroll top
        // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;



        if (scrollPosition >= this.topPosToStartShowing) {
            this.isShow = true;
        } else {
            this.isShow = false;
        }
    }

    // TODO: Cross browsing
    gotoTop() {

        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

  ngOnInit(): void {
      this.getUserId();
      this.getPub();
      this.getMesDem();
      this.dem=new DemandeModule();
  }
    getPub() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let list = [];
        this.publicationsService.getAllPub(this.n,this.s).subscribe((reslt) => {
            list=reslt;
            console.log('bbbbbbb'+reslt);
            console.log('ccccccc'+list);

            // eslint-disable-next-line guard-for-in
            for (const p of list){
                // @ts-ignore
                this.pubL.push(p);

            }
            console.log('aaaaaaaaa'+this.pubL);

        });
    }
    getUserId() {
        this.usersService.getUserID(this.userData.id).subscribe((reslt) => {
            this.user=reslt;

        });
    }
    getMesDem() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let list = [];
        this.requestService.getMesDemMatche(this.userData.id,this.n,this.s).subscribe((reslt) => {
            list=reslt;
            for (const p of list){
                // @ts-ignore
                this.demL.push(p);

            }
        });
    }
    getDem() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let SomeRandomArray = [];
        this.requestService.getAlldem(this.n,this.s).subscribe((reslt) => {
            SomeRandomArray=reslt;
            console.log('bbbbbbb'+reslt);
            console.log('ccccccc'+SomeRandomArray);

            // eslint-disable-next-line guard-for-in
            for (let p of SomeRandomArray){
                // @ts-ignore
                this.demL.push(p);

            }
            console.log('aaaaaaaaa'+this.demL);

        });
    }
    show(){
        if(this.n <  this.demL.length){
            this.n=this.n+1;
            console.log(this.n);
            this.getMesDem();
        }
    }
    openComposeDialog(): void
    {
        // Open the dialog
        const dialogRef = this._matDialog.open(AddDemComponent);

        dialogRef.afterClosed()
            .subscribe((result) => {
                console.log('Compose dialog was closed!');
            });
    }
    openCompetance(id): void
    {
        // Open the dialog
        const dialogRef = this._matDialog.open(PostuleComponent);

        dialogRef.afterClosed()
            .subscribe((result) => {
                console.log('Compose dialog was closed!');
            });
        this.router.navigate(['/apps/offre'],{queryParams:{'id':id}});

    }
    profilDetails(id){
        this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

    }
}
