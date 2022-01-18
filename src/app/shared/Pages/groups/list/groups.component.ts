import { Component, OnInit } from '@angular/core';
import {RolesService} from '../../../Services/roles.service';
import {GroupsService} from '../../../Services/groups.service';
import {RolesModels} from '../../../Models/Roles.models';
import {GroupsModels} from '../../../Models/Groups.models';
import {FuseNavigationItem} from '../../../../../@fuse/components/navigation';
import {MailboxComposeComponent} from '../../../../modules/admin/apps/mailbox/compose/compose.component';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {UsersModels} from '../../../Models/Users.models';
import {AddGComponent} from '../add/add.component';
import {EditGComponent} from '../edit/edit.component';
import {Router} from '@angular/router';
import {AffectationComponent} from '../affectation/affectation.component';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
    menuData: FuseNavigationItem[] = [];
    pagination: any;
    groupM: GroupsModels;
    groups: Array<GroupsModels>;
    id: any;
    drawerMode: 'side' | 'over';
    IDDelete: any;

    constructor(private groupsService: GroupsService,private _matDialog: MatDialog
        ,private router: Router) { }

  ngOnInit(): void {
      this.groupM=new GroupsModels();
      this.getRoles();
  }

    getRoles() {

        this.groupsService.getGroups().subscribe((reslt) => {
            this.groups = reslt;

        });
    }
    getRolesID() {
        this.groupsService.getGroupID( this.id ).subscribe((reslt) => {
            this.groupM = reslt;
            console.log(reslt);
        });

    }
    getGRID(id) {
        this.groupsService.getGroupID( id ).subscribe((reslt) => {
            this.groupM = reslt;
            console.log('fzefzefzefefz'+reslt);
        });

    }
    change(id) {
        let add: any;
        // eslint-disable-next-line eqeqeq

        this.groupsService.Change(id).subscribe((reslt) => {
            add = reslt;
            this.getRoles();

        });

    }
    openComposeDialog(): void
    {
        // Open the dialog
        const dialogRef = this._matDialog.open(AddGComponent);

        dialogRef.afterClosed()
            .subscribe((result) => {
                console.log('Compose dialog was closed!');
            });
    }
    selectToDelete(id){
        this.IDDelete=id;
    }
    selectToDatails(id){
        this.id=id;
    }
    update(id){
        {
            // Open the dialog
            const dialogRef = this._matDialog.open(EditGComponent);
            let add: any;

            dialogRef.afterClosed()
                .subscribe((result) => {
                    console.log('Compose dialog was closed!');
                });
            this.router.navigate(['/admin/Groups/liste'],{queryParams:{'id':id}});

            console.log(id);

        }
    }

    affectation(id){
        {
            // Open the dialog
            const dialogRef = this._matDialog.open(AffectationComponent);
            let add: any;

            dialogRef.afterClosed()
                .subscribe((result) => {
                    console.log('Compose dialog was closed!');
                });
            this.router.navigate(['/admin/Groups/liste'],{queryParams:{'id':id}});

            console.log(id);

        }
    }
    onDelete(id) {

        let res: any;
        this.groupsService.deleteGroup(id).subscribe((resltfe) => {
            res = resltfe;
            this.getRoles();


        });
        //localStorage.clear();
    }
}
