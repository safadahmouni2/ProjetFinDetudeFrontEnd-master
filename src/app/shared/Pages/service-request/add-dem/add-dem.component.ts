import {Component, HostListener, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {MailboxComposeComponent} from "../../../../modules/admin/apps/mailbox/compose/compose.component";
import {DemandeModule} from "../../../Models/demande.module";
import {ServiceRequestService} from "../../../Services/service-request.service";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {JwtHelperService} from "@auth0/angular-jwt";
import {MatchingModels} from "../../../Models/Matching.models";
import {GroupsModels} from "../../../Models/Groups.models";

@Component({
  selector: 'app-add-dem',
  templateUrl: './add-dem.component.html',
  styleUrls: ['./add-dem.component.scss']
})
export class AddDemComponent implements OnInit {
    match: MatchingModels;

    demL: Array<DemandeModule>=[];
    dem: DemandeModule;
    n=0;
    s=4;
    isShow: boolean;
    topPosToStartShowing = 100;
  constructor(public matDialogRef: MatDialogRef<MailboxComposeComponent>,private requestService: ServiceRequestService,private router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
      this.dem=new DemandeModule();
      this.match=new MatchingModels();

  }
    getDem() {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        var SomeRandomArray = [];
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
    Close(): void
    {

        // Close the dialog
        this.matDialogRef.close();
        this.getDem();

    }
    addDem( ) {
        let add: any;
        let add1: any;

        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
        const userData = {email: decodedToken.email, userId: decodedToken.userId};

        let competanceFilesCopie = Object.assign({}, this.dem);

        competanceFilesCopie.users={ id: decodedToken.id,name_user: decodedToken.name_user,first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title,login: decodedToken.login,pwd: decodedToken.pwd,
            gender: decodedToken.gender,age: decodedToken.age,phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            description: decodedToken.description,
            pays:decodedToken.pays,
            etat: decodedToken.etat,picture: decodedToken.picture};


        this.requestService.addDem( competanceFilesCopie ).subscribe((reslt) => {
            add = reslt;
            console.log(competanceFilesCopie.description+'jsfdhkj');
            this.requestService.addMatching(reslt,competanceFilesCopie.description
            ).subscribe((reslt1) => {
                add1 = reslt1;
                console.log(add1+'qcsfqsfqsfqsf');
            });
            this.getDem();
            this.router.navigate(['/apps/profil/mesDemandes']);
this.Close();
        });

    }
    /*matching(){
      let add1;


        this.requestService.addMatching(3714,'this.dem.description'
             ).subscribe((reslt1) => {
            add1 = reslt1;
            console.log(add1+'qcsfqsfqsfqsf');
        });
    }*/

}
