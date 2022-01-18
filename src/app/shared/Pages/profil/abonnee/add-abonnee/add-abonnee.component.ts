import { Component, OnInit } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {PublictionModule} from '../../../../Models/publiction.module';
import {AbonneeModels} from '../../../../Models/abonnee.models';
import {UsersModels} from '../../../../Models/Users.models';
import {UsersService} from '../../../../Services/users.service';
import {ServiceRequestService} from '../../../../Services/service-request.service';
import {PublicationsService} from '../../../../Services/publications.service';
import {Router} from '@angular/router';
import {AbonneeService} from '../../../../Services/abonnee.service';

@Component({
  selector: 'app-add-abonnee',
  templateUrl: './add-abonnee.component.html',
  styleUrls: ['./add-abonnee.component.scss']
})
export class AddAbonneeComponent implements OnInit {
    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = {id: this.decodedToken.id};
    abonnee: AbonneeModels;
    id: any;
    load = false;
    isShow: boolean;
    topPosToStartShowing = 100;
    user: UsersModels;

    constructor(private usersService: UsersService, private requestService: ServiceRequestService,
                private abonneeService: AbonneeService, private router: Router) {
    }

    ngOnInit(): void {
        this.getUserId();
        this.getNBAbonne();
        this.load = true;
    }

    getUserId() {
        this.usersService.getUserID(this.userData.id).subscribe((reslt) => {
            this.user = reslt;
        });
    }

    newAbonnee(): void {
        this.abonnee = new AbonneeModels();
    }

   /* saveAbonnee(id, index) {
        let add: any;
        const token = localStorage.getItem('AuthToken');
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token.toString());
      //  const id_prest = { userId: decodedToken.userId};

       // id =  this.usersService.getUserID(this.id);
        this.abonneeService.addAbonnee(id, this.userData.id).subscribe((data) => {
            add = data;
            this.abonnee[index].abonnee(this.userData.id);s
        });
    }*/
    getNBAbonne() {
        this.abonneeService.countAbonnee(this.userData.id).subscribe((reslt) => {
            this.abonnee = reslt;
            this.load=false;
        });}


    profilDetails(id){
        this.router.navigate(['/apps/profil/detail'],{queryParams:{'id':id}});

    }
}
