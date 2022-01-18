import { Component, OnInit } from '@angular/core';
import {GroupsModels} from '../../../Models/Groups.models';
import {GroupsService} from '../../../Services/groups.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MailboxComposeComponent} from '../../../../modules/admin/apps/mailbox/compose/compose.component';
import {ActivatedRoute, Router} from '@angular/router';
import {GroupRoleUserModels} from '../../../Models/GroupRoleUser.models';
import {RolesService} from '../../../Services/roles.service';
import {UserService} from '../../../../core/user/user.service';
import {RolesModels} from '../../../Models/Roles.models';
import {UsersModels} from '../../../Models/Users.models';
import {UsersService} from '../../../Services/users.service';

@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.scss']
})
export class AffectationComponent implements OnInit {
    groupRoleUserModels: GroupRoleUserModels;
    group: GroupsModels;

    alert: any;
    groups: Array<GroupRoleUserModels>;
    roles: Array<RolesModels>;
    users: Array<UsersModels>;

    id: any;
  constructor(private rolesService: RolesService,private userService: UsersService,private groupsService: GroupsService,public matDialogRef: MatDialogRef<MailboxComposeComponent>,private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
          this.getGroupID();
          this.getRoles();
              this.getUsers();
          this.groupRoleUserModels=new GroupRoleUserModels();
         // this.groupRoleUserModels.id = params['id'];
      });
  }
    Close(): void
    {

        // Close the dialog
        this.matDialogRef.close();


    }
    getGroupID() {
        this.groupsService.getGroupID( this.id ).subscribe((reslt) => {
            this.groupRoleUserModels = reslt;
            console.log(reslt);
        });

    }
    getRoles() {

        this.rolesService.getAllRoleActive().subscribe((reslt) => {
            this.roles = reslt;

        });
    }
    getUsers() {

        this.userService.getAllUser().subscribe((reslt) => {
            this.users = reslt;

        });
    }
    Affectation() {
        let add: any;
        console.log('5555555555555' + this.groupRoleUserModels.id);
        this.groupsService.Affectation(this.groupRoleUserModels).subscribe((reslt) => {
            add = reslt;
            //  this.router.navigate(['/apps/CompetencesFiles/liste']);
            //this.getRoles();

            window.location.reload();

        });
    }
}
