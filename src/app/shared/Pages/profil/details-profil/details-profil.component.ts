import {Component, HostListener, Input, OnInit} from '@angular/core';
import {PublictionModule} from '../../../Models/publiction.module';
import {UsersModels} from '../../../Models/Users.models';
import {UsersService} from '../../../Services/users.service';
import {PublicationsService} from '../../../Services/publications.service';
import {ActivatedRoute, Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AddDemComponent} from '../../service-request/add-dem/add-dem.component';
import {DomSanitizer} from '@angular/platform-browser';
import { ThemePalette } from '@angular/material/core';
import {AbonneeModels} from '../../../Models/abonnee.models';
import {AbonneeService} from '../../../Services/abonnee.service';

@Component({
  selector: 'app-details-profil',
  templateUrl: './details-profil.component.html',
  styleUrls: ['./details-profil.component.scss']
})
export class DetailsProfilComponent implements OnInit {
  //*****param abonnee****
    clicked = false;

    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = {id: this.decodedToken.id};
    abonnee: AbonneeModels;
    abonneeList: Array<UsersModels> = [];

    etatAbonne: boolean = false;
    IDDelete: any;
    id: any;
    index: any;
    load=false;
    //****param abonnee****
    n = 0;
    s = 2;
    pubL: Array<PublictionModule> = [];
    user: UsersModels;
    pub: PublictionModule;
    idPrest: any;
    topPosToStartShowing = 100;
    isShow: boolean;

    buttonColor: ThemePalette = 'primary';
    public buttonName: string =  '';
    constructor(private sanitizer: DomSanitizer,private route: ActivatedRoute,
                private usersService: UsersService, private abonneeService: AbonneeService,
                private router: Router,
                private publicationsService: PublicationsService) {
    }

    ngOnInit(): void {

        this.route.queryParams.subscribe((params) => {
            this.id = params['id'];
            this.getMesPub();
            this.getUserId();
            this.getEtatAbonnment(this.id,this.userData.id);
            this.getAbonnees();
      //  this.getEtatAbonne(this.userData.id,this.id);
        });
    }
    getAbonnees() {
        this.abonneeService.getAllAbonnes(this.userData.id).subscribe((reslt) => {
            this.abonneeList = reslt;
            console.log('iciiiiiiiiiiiiiiiiiiiiiiiiiii',this.abonneeList);
            const idA= this.abonneeList.find(x => x.id == this.id);
            console.log('labaaaaaaaaaaaaaaaaaas' , idA       );
if(idA != null){
    this.buttonName = 'S\'abonner en retour';
    this.buttonColor = 'primary';

}
           /* this.getEtatAbonne(this.id, this.userData.id);
            if(this.etatAbonne){
                this.buttonName = 'Abonnée';
                this.buttonColor = 'accent';
            }else{
                this.buttonName = 's\'abonner en retour';
                this.buttonColor = 'warn';
            }*/});
    }
    // getEtatAbonnment id_abonne == id.userData.id
    getEtatAbonnment(id_prestataire,id_abonnee){
        this.abonneeService.getEtatAbonnement(this.id ,this.userData.id).subscribe((reslt) => {
            this.etatAbonne = reslt;

            if(this.etatAbonne){
                this.buttonName = 'Se désabonner';
                this.buttonColor = 'warn';
            }else{
                this.buttonName = 'S\'abonner';
                this.buttonColor = 'primary';
            }
        });
        return this.etatAbonne;
    }
    // getEtatAbonnme id_prestataire == id.userData.id
   /* getEtatAbonne(id_prestataire,id_abonnee) {
        if(this.etatAbonne==true){
            this.buttonName = "Abonnée";
            this.buttonColor = "accent";
        }else{
            this.buttonName = "S'abonner en retour";
            this.buttonColor = "primary";
        }
    }*/
    getUserId() {
        this.usersService.getUserID(this.id).subscribe((reslt) => {
            this.user = reslt;
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
    getMesPub() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let list = [];
        this.publicationsService.getMesPub(this.id,this.n,this.s).subscribe((reslt) => {
            list=reslt;
            // eslint-disable-next-line guard-for-in
            for (const p of list){
                // @ts-ignore
                this.pubL.push(p);
            }
        });
    }
    show(){
        if(this.n <  this.pubL.length){
            this.n=this.n+1;
            console.log(this.n);
            this.getMesPub();
        }
    }
    saveAbonnee(id, index) {
        let add: any;
        if(!this.etatAbonne){
            this.abonneeService.addAbonnee(id, this.userData.id).subscribe((data) => {
                add = data;
                this.abonnee[index].abonnee(this.userData.id);
                this.abonnee.etat=true;
            });
        }

    }
   /* addAbonne(): void
    {
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        const abonnemodelCopie = Object.assign({}, this.abonnee);

       abonnemodelCopie.id_abonnee= decodedToken.id;
        abonnemodelCopie.id_prestataire=this.id;

        // Get the clone of the event form value
        // Add the event
        this..addAbonnee(abonnemodelCopie).subscribe(() => {
            this.getEvents(this.userData.id);

            // Close the event panel
            this._closeEventPanel();

        });
    }*/
    //add notif
   /* saveNotification(id) {
        // @ts-ignore
        this.notificationService.addNotif().subscribe((data) => {
            this.notification = data;
        });
    }*/
    desabonner(){
            let res: any;
            this.abonneeService.deleteAbonne(this.userData.id, this.id).subscribe((resltfe) => {
                res = resltfe;
            });
    }
    toggle() {
        // CHANGE THE NAME OF THE BUTTON.
        console.log('hhhhhhhhhhh',this.buttonName);
        console.log('hhhhhhhhhhh',this.etatAbonne);
        if(this.buttonName==='S\'abonner' ||this.buttonName === 'S\'abonner en retour' ){
        this.saveAbonnee(this.id, this.index);
        this.buttonName = 'Se désabonner';
        this.buttonColor = 'warn';
    }else if(this.buttonName==='Se désabonner'){
            let res: any;
            this.abonneeService.deleteAbonne(this.userData.id, this.id).subscribe((resltfe) => {
                res = resltfe;
            });
            this.getAbonnees();
            this.buttonName = 'S\'abonner';
    console.log('hhhhhhhhhhh',this.buttonName);
    this.buttonColor = 'primary';
}
    }
}
