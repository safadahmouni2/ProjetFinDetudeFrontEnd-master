import { Component, OnInit } from '@angular/core';
import {GroupsService} from '../../../Services/groups.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MailboxComposeComponent} from '../../../../modules/admin/apps/mailbox/compose/compose.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceRequestService} from '../../../Services/service-request.service';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {GroupsModels} from '../../../Models/Groups.models';
import {DemandeComp} from '../../../Models/DemandeComp';
import {GroupRoleUserModels} from '../../../Models/GroupRoleUser.models';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {DemandeModule} from "../../../Models/demande.module";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-postule',
  templateUrl: './postule.component.html',
  styleUrls: ['./postule.component.scss']
})
export class PostuleComponent implements OnInit {
    token = localStorage.getItem('AuthToken');
    helper = new JwtHelperService();
    decodedToken = this.helper.decodeToken(this.token.toString());
    userData = { id: this.decodedToken.id};
    demandeComp: DemandeComp;
    dem: DemandeModule;

    demandeCompL: Array<DemandeComp>;
    compL: Array<CompetanceFilesModels>;
    id:any;
    constructor(private competanceFilesService: CompetanceFilesService,private requestService: ServiceRequestService,public matDialogRef: MatDialogRef<MailboxComposeComponent>
              ,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
          this.getSer();
      this.demandeComp=new DemandeComp();
      this.getMine();
      });
  }
    Affectation() {
        let add: any;
        this.demandeComp.servId =  this.id;
       this.demandeComp.compId =  this.compL[0].id;

        console.log('5555555555555' + this.demandeComp.servId + '+++++++++' + this.demandeComp.compId );
        this.requestService.postule(this.demandeComp.compId,this.demandeComp.servId).subscribe((reslt) => {
            add = reslt;
            //  this.router.navigate(['/apps/CompetencesFiles/liste']);
            //this.getRoles();

           // window.location.reload();
this.Close();
        });
    }
    Go(){
        this.Close();
    }
    Close(): void
    {

        // Close the dialog
        this.matDialogRef.close();


    }
    getMine() {
console.log("hiiiiiiiiiiiiiiii"+this.userData.id);
        this.competanceFilesService.getMine(this.userData.id).subscribe((reslt) => {
            this.compL = reslt;

        });
    }
    getSer() {
        this.requestService.getSer( this.id ).subscribe((reslt) => {
            this.dem = reslt;
            console.log(reslt);
        });

    }

}
