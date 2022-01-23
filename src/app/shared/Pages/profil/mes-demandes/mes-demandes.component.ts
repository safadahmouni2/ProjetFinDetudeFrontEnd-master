import {Component, HostListener, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DemandeModule} from '../../../Models/demande.module';
import {PublictionModule} from '../../../Models/publiction.module';
import {UsersModels} from '../../../Models/Users.models';
import {UsersService} from '../../../Services/users.service';
import {ServiceRequestService} from '../../../Services/service-request.service';
import {PublicationsService} from '../../../Services/publications.service';
import {DomSanitizer} from '@angular/platform-browser';
import {PublictionAddModule} from '../../../Models/publictionAdd.module';
import {AddDemComponent} from '../../service-request/add-dem/add-dem.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {PostuleModels} from '../../../Models/Postule.models';
import {AbonneeService} from '../../../Services/abonnee.service';
import {AbonneeModels} from '../../../Models/abonnee.models';

@Component({
  selector: 'app-mes-demandes',
  templateUrl: './mes-demandes.component.html',
  styleUrls: ['./mes-demandes.component.scss']
})
export class MesDemandesComponent implements OnInit {
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
        description: this.decodedToken.description,
        pays: this.decodedToken.pays,
    };

    users: any;
    load =false;
    n=0;
    s=4;
    selectedFile: File;
    demL: Array<DemandeModule>=[];
    MesdemL: Array<DemandeModule>=[];

    dem: DemandeModule;
    pub: PublictionModule;
    pubAdd: PublictionAddModule;
    abonnee: AbonneeModels;
    abonnement: AbonneeModels;
    pubL: Array<PublictionModule>=[];
    MespubL: Array<PublictionModule>=[];
    competanceF: Array<PostuleModels>;

    user: UsersModels;
    listuser: Array<UsersModels>=[];
    topPosToStartShowing = 100;
    isShow: boolean;

  constructor(private competanceFilesService: CompetanceFilesService,private usersService: UsersService ,
              private _matDialog: MatDialog,private requestService: ServiceRequestService ,
              private abonneeService: AbonneeService,
              private publicationsService: PublicationsService,private sanitizer: DomSanitizer,private router: Router) { }

  ngOnInit(): void {
      this.getNBAbonne();
      this.getNBAbonnement();
      this.getAllAbonnes();
      this.load=true;
      this.getUserId();
      this.getDem();
      this.getPub();
      this.getMesDem();
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

    getAllAbonnes() {
        this.abonneeService.getAllAbonnes(this.userData.id).subscribe((reslt) => {
            this.listuser = reslt;

        });
    }
    profilDetails(id){
        this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

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
    consulter(id){
        this.router.navigate(['/apps/CompetencesFiles/liste'],{queryParams:{'id':id}});

    }
    MesCV(id){
        {

            this.router.navigate(['/apps/CompetencesFiles/Maliste'],{queryParams:{'id':id}});

            console.log(id);

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
    getMesDem() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let list = [];
        this.requestService.getMesDem(this.userData.id,this.n,this.s).subscribe((reslt) => {
            list=reslt;
            console.log('bbbbbbb'+reslt);
            console.log('ccccccc'+list);

            // eslint-disable-next-line guard-for-in
            for (const p of list){
                // @ts-ignore
                this.MesdemL.push(p);

            }
            console.log('aaaaaaaaa'+this.demL);

        });
    }
    getUserId() {
        this.usersService.getUserID(this.userData.id).subscribe((reslt) => {
            this.user=reslt;

        });
    }

    show(){
        if(this.n <  this.demL.length){
            this.n=this.n+1;
            console.log(this.n);
            this.getMesDem();
        }
    }
    addPub( ) {
        let add: any;


        this.publicationsService.addPub( this.pubAdd ).subscribe((reslt) => {
            add = reslt;
            this.getMesDem();

        });}
    /*addPubI( ) {
        let add: any;


        this.publicationsService.addPubI( this.pub.status,this.selectedFile ).subscribe((reslt) => {
            add = reslt;
            this.getMesDem();

        });}*/
    addPubV( ) {
        let add: any;


        this.publicationsService.addPubV( this.pub.users,this.pub.status,this.selectedFile ).subscribe((reslt) => {
            add = reslt;
            this.getMesDem();

        });}
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];

    }
    addDem( ) {
        let add: any;


        this.requestService.addDem( this.dem ).subscribe((reslt) => {
            add = reslt;
            this.getMesDem();
            window.location.reload();

        });}
    openComposeDialog(): void
    {
        // Open the dialog
        const dialogRef = this._matDialog.open(AddDemComponent);

        dialogRef.afterClosed()
            .subscribe((result) => {
                console.log('Compose dialog was closed!');
            });
    }
    getCV(id) {
        const list = [];

        this.competanceFilesService.getCV(id,this.n,this.s).subscribe((reslt) => {
            this.competanceF = reslt;

        });
    }
}
