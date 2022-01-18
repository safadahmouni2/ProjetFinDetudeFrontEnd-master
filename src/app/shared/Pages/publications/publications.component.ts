import {Component, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {CompetanceFilesService} from '../../Services/competance-files.service';
import {Router} from '@angular/router';
import {PublicationsService} from '../../Services/publications.service';
import {CompetanceFilesModels} from '../../Models/Competance-files.models';
import {PublictionModule} from '../../Models/publiction.module';
import {DomSanitizer} from '@angular/platform-browser';
import {UsersModels} from '../../Models/Users.models';
import {DOCUMENT} from '@angular/common';
import {DemandeModule} from '../../Models/demande.module';
import {ServiceRequestService} from '../../Services/service-request.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from "../../Services/users.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {PublictionAddModule} from "../../Models/publictionAdd.module";
import {DemandeComp} from "../../Models/DemandeComp";
import {AimeModels} from "../../Models/Aime.models";
import content from "*.scss";
import {CommentModels} from "../../Models/Comment.models";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = {
        id: this.decodedToken.id,
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
        role: this.decodedToken.aud.substring(1, this.decodedToken.aud.length - 1).split(","),
    };
    competanceF: Array<CompetanceFilesModels>;

    comL: Array<CommentModels> = [];
    com: CommentModels;
    pubL: Array<PublictionModule> = [];
    pub: PublictionModule;
    pubAdd: PublictionAddModule;
    aimes: any;
    demL: Array<DemandeModule> = [];
    dem: DemandeModule;
    n = 0;
    s = 4;
    nc = 0;
    sc = 4;
    customers: any;
    selectedFile: File;
    isShow: boolean;
    topPosToStartShowing = 100;
    user: UsersModels;
    aimeM: AimeModels;
    id: any;
    load=false;

    public textArea: string = '';
    public isEmojiPickerVisible: boolean;
    ButtonEtat: boolean;
    @Input()addcom:any;
    constructor(private competanceFilesService: CompetanceFilesService,private _snackBar: MatSnackBar,
        private usersService: UsersService, private requestService: ServiceRequestService, private publicationsService: PublicationsService, private router: Router
        , private sanitizer: DomSanitizer) {
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

    ngOnInit(): void {


        //filterMenu(this.userData.role);


        this.getUserId();
        this.getPub();
        this.getDem();
//this.NBRaime();
        this.pubAdd = new PublictionAddModule();
        this.dem = new DemandeModule();
        this.com = new CommentModels();
        this.load = true;

    }

    signaler(id) {
        let add: any;
        this.publicationsService.signaler(id).subscribe((reslt) => {
            add = reslt;

            this.getPub();

        });
    }

    getUserId() {
        this.usersService.getUserID(this.userData.id).subscribe((reslt) => {
            this.user = reslt;

        });
    }

    getPub() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let list = [];
        this.publicationsService.getAllPub(this.n, this.s).subscribe((reslt) => {
            list = reslt;
            console.log('bbbbbbb' + reslt);
            console.log('ccccccc' + list);

            // eslint-disable-next-line guard-for-in
            for (const p of list) {
                // @ts-ignore
                this.pubL.push(p);


            }
            console.log('aaaaaaaaa' + this.pubL);
            this.load=false;

        });
    }

    getDem() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        let SomeRandomArray = [];
        this.requestService.getAlldem(this.n, this.s).subscribe((reslt) => {
            SomeRandomArray = reslt;
            console.log('bbbbbbb' + reslt);
            console.log('ccccccc' + SomeRandomArray);

            // eslint-disable-next-line guard-for-in
            for (const p of SomeRandomArray) {
                // @ts-ignore
                this.demL.push(p);

            }
            console.log('aaaaaaaaa' + this.demL);

        });
    }

    show() {
        if (this.n < this.pubL.length) {
            this.n = this.n + 1;
            console.log(this.n);
            this.getPub();
        }
    }
    CommentShow(id) {
        if (this.nc < this.comL.length-1) {
            this.nc = this.nc + 1;
            console.log(this.nc+'hereeeeeeeeeeeeeee');
            let list=[];
            this.publicationsService.getComment(id, this.nc, this.sc).subscribe((reslt) => {
                list= reslt;
                for (const p of list) {
                    // @ts-ignore
                    this.comL.push(p);

                }
            });        }
    }

    addPub() {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        let competanceFilesCopie = Object.assign({}, this.pubAdd);

        competanceFilesCopie.users = {
            id: decodedToken.id, name_user: decodedToken.name_user, first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title, login: decodedToken.login, pwd: decodedToken.pwd,
            gender: decodedToken.gender, age: decodedToken.age, phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays: decodedToken.pays,
            etat: decodedToken.etat, picture: decodedToken.picture
        };

        this.publicationsService.addPub(competanceFilesCopie).subscribe((reslt) => {
            add = reslt;
            this.getPub();
            window.location.reload();

        });

    }

    addPubI() {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        let competanceFilesCopie = Object.assign({}, this.pubAdd);
        competanceFilesCopie.users = {
            id: decodedToken.id, name_user: decodedToken.name_user, first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title, login: decodedToken.login, pwd: decodedToken.pwd,
            gender: decodedToken.gender, age: decodedToken.age, phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays: decodedToken.pays,
            etat: decodedToken.etat, picture: decodedToken.picture
        };

        this.publicationsService.addPubI(competanceFilesCopie.users, this.pubAdd.status, this.selectedFile).subscribe((reslt) => {
            add = reslt;
            this.getPub();
            window.location.reload();

        });

    }

    addPubV() {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        let competanceFilesCopie = Object.assign({}, this.pubAdd);

        competanceFilesCopie.users = {
            id: decodedToken.id, name_user: decodedToken.name_user, first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title, login: decodedToken.login, pwd: decodedToken.pwd,
            gender: decodedToken.gender, age: decodedToken.age, phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays: decodedToken.pays,
            etat: decodedToken.etat, picture: decodedToken.picture
        };

        this.publicationsService.addPubV(competanceFilesCopie.users, this.pubAdd.status, this.selectedFile).subscribe((reslt) => {
            add = reslt;
            this.getPub();
            window.location.reload();

        });
    }

    uploadAvatar(fileList: FileList): void {
        this.selectedFile = fileList[0];

    }

    addDem() {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        let competanceFilesCopie = Object.assign({}, this.dem);

        competanceFilesCopie.users = {
            id: decodedToken.id, name_user: decodedToken.name_user, first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title, login: decodedToken.login, pwd: decodedToken.pwd,
            gender: decodedToken.gender, age: decodedToken.age, phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays: decodedToken.pays,
            etat: decodedToken.etat, picture: decodedToken.picture
        };


        this.requestService.addDem(competanceFilesCopie).subscribe((reslt) => {
            add = reslt;
            this.getDem();
            window.location.reload();

        });
    }

    aime(id, index) {
        let add: any;

        this.publicationsService.aime(id, this.userData.id).subscribe((reslt) => {
                add = reslt;
                this.pubL[index].likes.push(this.userData.id);
            }
        );

        this.getComment(id);
    }


    aimePas(id,index) {
        let add: any;

        this.publicationsService.aimePas(this.userData.id, id).subscribe((reslt) => {
                add = reslt;
        });
        index = this.pubL.findIndex((value)=>{
            if(value===this.userData.id)
                this.pubL.splice(index,1);
        });
    }

    NBRaime() {
        let x;
        for (const p of this.pubL) {
            // @ts-ignore
            x = p.id;
        }

        /*   this.publicationsService.nbrAime(3439).subscribe((reslt) => {
               this.aimes = reslt;
               console.log('dskvjhsdvkjhsdvkjsdhvksdjvhsdkjvsdkjv'+this.aimes);
           });*/

    }

    getComment(id) {
        let list=[];
        this.publicationsService.getComment(id, this.nc, this.sc).subscribe((reslt) => {
            this.comL= reslt;
            this.nc=0;
            console.log(this.nc+'thereeeeeeeeeeeeeee');

            /*for (const p of list) {
                // @ts-ignore
                this.comL.push(p);

            }*/
        });


    }

    Commenter(id) {

        let add;

        this.publicationsService.comment(this.com.text, id, this.userData.id).subscribe((reslt) => {
            add = reslt;
            for (const e of this.pubL) {
                e.commentaire.length = e.commentaire.length + 1;
            }
            this.getUserId();
            this.getPub();
            this.com = new CommentModels();
        });


//this.reloadCurrentRoute();
    }

    public addEmoji(event) {
        this.com.text = `${this.com.text}${event.emoji.native}`;
        this.isEmojiPickerVisible = false;
    }
    reloadCurrentRoute() {
        let currentUrl = this.router.url;
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([currentUrl]);
        });
    }
    openSnackBar() {
        this._snackBar.open('success', 'Ok');
    }

    likeFunct(listUser,idUser):boolean{

        if(listUser.some(user => user=== idUser)){
            return true;
        }else return false;


        }

profilDetails(id){
    this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

}
}
