import {Component, HostListener, OnInit} from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {DemandeModule} from '../../../Models/demande.module';
import {PublictionModule} from '../../../Models/publiction.module';
import {UsersModels} from '../../../Models/Users.models';
import {UsersService} from '../../../Services/users.service';
import {ServiceRequestService} from '../../../Services/service-request.service';
import {PublicationsService} from '../../../Services/publications.service';
import {DomSanitizer} from '@angular/platform-browser';
import {PostuleModels} from '../../../Models/Postule.models';
import {PublictionAddModule} from '../../../Models/publictionAdd.module';
import {Router} from '@angular/router';
import {AbonneeService} from "../../../Services/abonnee.service";
import {AbonneeModels} from "../../../Models/abonnee.models";

@Component({
  selector: 'app-postule',
  templateUrl: './postule.component.html',
  styleUrls: ['./postule.component.scss']
})
export class MesPostuleComponent implements OnInit {
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


    users: Array<UsersModels>;
load =false;
    n=0;
    s=4;
    selectedFile: File;
    demL: Array<DemandeModule>=[];
    postule: Array<PostuleModels>=[];

    dem: DemandeModule;
    pub: PublictionModule;
    pubAdd: PublictionAddModule;

    pubL: Array<PublictionModule>=[];
    user: UsersModels;
abonnee: AbonneeModels;
    abonnement: AbonneeModels;
    topPosToStartShowing = 100;
    isShow: boolean;
    countuser: any;
  constructor(private router: Router,private usersService: UsersService ,private requestService: ServiceRequestService ,
              private abonneeService: AbonneeService,
              private publicationsService: PublicationsService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      this.load=true;
      this.getNBAbonnement();
      this.getNBAbonne();
      this.getUserId();
      this.getDem();
      this.getMesPostule();
      this.getMesPub();
      this.getAllAbonnes();
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
            this.users = reslt;

        });
    }
    profilDetails(id){
        this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

    }
    MesCV(id){
        {

            this.router.navigate(['/apps/CompetencesFiles/Maliste'],{queryParams:{'id':id}});

            console.log(id);

        }
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
    gotoTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }
    getMesPostule() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let list = [];
        this.requestService.getMesPostule(this.userData.id,this.n,this.s).subscribe((reslt) => {
            list=reslt;
            console.log('bbbbbbb'+reslt);
            console.log('ccccccc'+list);

            // eslint-disable-next-line guard-for-in
            for (const p of list){
                // @ts-ignore
                this.postule.push(p);

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
        if(this.n <  this.pubL.length){
            this.n=this.n+1;
            console.log(this.n);
            this.getMesPostule();
        }
    }
    addPub( ) {
        let add: any;


        this.publicationsService.addPub( this.pubAdd ).subscribe((reslt) => {
            add = reslt;
            this.getMesPostule();

        });}
   /* addPubI( ) {
        let add: any;


        this.publicationsService.addPubI( this.pub.status,this.selectedFile ).subscribe((reslt) => {
            add = reslt;
            this.getMesPostule();

        });}*/
    addPubV( ) {
        let add: any;


        this.publicationsService.addPubV( this.pub.users,this.pub.status,this.selectedFile ).subscribe((reslt) => {
            add = reslt;
            this.getMesPostule();

        });}
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];

    }
    addDem( ) {
        let add: any;


        this.requestService.addDem( this.dem ).subscribe((reslt) => {
            add = reslt;
            this.getMesPostule();
            window.location.reload();

        });}
}
