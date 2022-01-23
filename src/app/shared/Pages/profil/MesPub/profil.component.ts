import {Component, HostListener, OnInit} from '@angular/core';
import {ServiceRequestService} from '../../../Services/service-request.service';
import {PublicationsService} from '../../../Services/publications.service';
import {PublictionModule} from '../../../Models/publiction.module';
import {DemandeModule} from '../../../Models/demande.module';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DomSanitizer} from '@angular/platform-browser';
import {UsersService} from '../../../Services/users.service';
import {UsersModels} from '../../../Models/Users.models';
import {Byte} from '@angular/compiler/src/util';
import {PublictionAddModule} from '../../../Models/publictionAdd.module';
import {AddDemComponent} from '../../service-request/add-dem/add-dem.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MailboxComposeComponent} from '../../../../modules/admin/apps/mailbox/compose/compose.component';
import {Router} from '@angular/router';
import {AbonneeModels} from '../../../Models/abonnee.models';
import {AbonneeService} from '../../../Services/abonnee.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
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
        confirmPassword:this.decodedToken.confirmPassword,
        gender: this.decodedToken.gender,
        age: this.decodedToken.age,
        phone: this.decodedToken.phone,
        date_birth: this.decodedToken.date_birth,
        pays: this.decodedToken.pays,
        };


    n=0;
    s=4;
    selectedFile: File;
    demL: Array<DemandeModule>=[];
    dem: DemandeModule;
    pub: PublictionModule;
    pubAdd: PublictionAddModule;
    listuser: Array<UsersModels>=[];
    listabonnees: Array<UsersModels>=[];
    pubL: Array<PublictionModule>=[];
    user: UsersModels;
    abonnee: AbonneeModels;
    abonnement: AbonneeModels;
    byte: Byte[];
    topPosToStartShowing = 100;
    isShow: boolean;
    users: any;
    load: boolean;
    constructor(private router: Router,private usersService: UsersService ,private _matDialog: MatDialog,private requestService: ServiceRequestService ,
               private abonneeService: AbonneeService
                ,private publicationsService: PublicationsService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      this.getUserId();
     //this.getAllAbonnement();
      this.getAllAbonnes();
     this.getNBAbonnement();
      this.getDem();
      this.getMesPub();
      this.load = true;
        //this.getUsers();
        this.getNBAbonne();
      this.pubAdd=new PublictionAddModule();
      this.dem=new DemandeModule();
  }
    getNBAbonnement() {
        this.abonneeService.countAbonnement(this.userData.id).subscribe((reslt) => {
            this.abonnement = reslt;
            this.load=false;
        });}
    getNBAbonne() {
        this.abonneeService.countAbonnee(this.userData.id).subscribe((reslt) => {
            this.abonnee = reslt;
            this.load=false;
        });}

    profilDetails(id){
        this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

    }

    getAllAbonnes() {
        this.abonneeService.getAllAbonnes(this.userData.id).subscribe((reslt) => {
            this.listuser = reslt;

        });
    }

    @HostListener('window:scroll')
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
    MesCV(id){
        {

            this.router.navigate(['/apps/CompetencesFiles/Maliste'],{queryParams:{'id':id}});

            console.log(id);

        }
    }
    getDem() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let SomeRandomArray = [];
        this.requestService.getAlldem(this.n,this.s).subscribe((reslt) => {
            SomeRandomArray=reslt;
            console.log('bbbbbbb'+reslt);
            console.log('ccccccc'+SomeRandomArray);

            // eslint-disable-next-line guard-for-in
            for (const p of SomeRandomArray){
                // @ts-ignore
                this.demL.push(p);

            }
            console.log('aaaaaaaaa'+this.demL);

        });
    }
    getMesPub() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let list = [];
        this.publicationsService.getMesPub(this.userData.id,this.n,this.s).subscribe((reslt) => {
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
    show(){
        if(this.n <  this.pubL.length){
            this.n=this.n+1;
            console.log(this.n);
            this.getMesPub();
        }
    }
    addPub( ) {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        const competanceFilesCopie = Object.assign({}, this.pubAdd);

        competanceFilesCopie.users={ id: decodedToken.id,
            name_user: decodedToken.name_user,
            first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title,
            login: decodedToken.login,
            pwd: decodedToken.pwd,
            confirmPassword:decodedToken.confirmPassword,
            gender: decodedToken.gender,age: decodedToken.age,phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays:decodedToken.pays,
            etat: decodedToken.etat,picture: decodedToken.picture};

        this.publicationsService.addPub( competanceFilesCopie ).subscribe((reslt) => {
            add = reslt;
            this.getMesPub();
        });
        window.location.reload();

    }
    addPubI( ) {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        const competanceFilesCopie = Object.assign({}, this.pubAdd);

        competanceFilesCopie.users={ id: decodedToken.id,name_user: decodedToken.name_user,first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title,login: decodedToken.login,pwd: decodedToken.pwd,
            confirmPassword:decodedToken.confirmPassword,
            gender: decodedToken.gender,age: decodedToken.age,phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays:decodedToken.pays,
            etat: decodedToken.etat,picture: decodedToken.picture};




        this.publicationsService.addPubI( competanceFilesCopie.users,this.pubAdd.status,this.selectedFile ).subscribe((reslt) => {
            add = reslt;
            this.getMesPub();

        });
        window.location.reload();
    }
    addPubV( ) {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        const competanceFilesCopie = Object.assign({}, this.pubAdd);

        competanceFilesCopie.users={ id: decodedToken.id,name_user: decodedToken.name_user,first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title,login: decodedToken.login,pwd: decodedToken.pwd,confirmPassword:decodedToken.confirmPassword,
            gender: decodedToken.gender,age: decodedToken.age,phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays:decodedToken.pays,
            etat: decodedToken.etat,picture: decodedToken.picture};

        this.publicationsService.addPubV( competanceFilesCopie.users,this.pubAdd.status,this.selectedFile ).subscribe((reslt) => {
            add = reslt;
            this.getMesPub();

        });
        window.location.reload();
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
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];

    }
    addDem( ) {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        const competanceFilesCopie = Object.assign({}, this.dem);

        competanceFilesCopie.users={ id: decodedToken.id,name_user: decodedToken.name_user,first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title,login: decodedToken.login,pwd: decodedToken.pwd,confirmPassword:decodedToken.confirmPassword,
            gender: decodedToken.gender,age: decodedToken.age,phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays:decodedToken.pays,
            etat: decodedToken.etat,picture: decodedToken.picture};

        this.requestService.addDem( competanceFilesCopie).subscribe((reslt) => {
            add = reslt;
            this.getMesPub();
            window.location.reload();

        });}
}
