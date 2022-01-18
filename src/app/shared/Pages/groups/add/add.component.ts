import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {GroupsService} from '../../../Services/groups.service';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {GroupsModels} from '../../../Models/Groups.models';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {MailboxComposeComponent} from '../../../../modules/admin/apps/mailbox/compose/compose.component';
import {Task} from '../../../../modules/admin/apps/tasks/tasks.types';
import {RolesModels} from '../../../Models/Roles.models';
import {RolesService} from "../../../Services/roles.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddGComponent implements OnInit {
    composeForm: FormGroup;
    group: GroupsModels;
    alert: any;
    groups: Array<GroupsModels>;
    roles: Array<RolesModels>;
    role: RolesModels;

    task: Task;

  constructor(public matDialogRef: MatDialogRef<MailboxComposeComponent>,private rolesService: RolesService,private groupsService: GroupsService,private router: Router) { }

  ngOnInit(): void {
      this.group=new GroupsModels();
      this.role=new RolesModels();

      this.getGroups();
this.getRoles();
  }
    addGroup( ) {
        let add: any;


        this.groupsService.addGroup(this.group).subscribe((reslt) => {
            add = reslt;

               this.getGroups();
            window.location.reload();
        });
  }
    getGroups() {

        this.groupsService.getGroups().subscribe((reslt) => {
            this.groups = reslt;

        });
    }
    Close(): void
    {

        // Close the dialog
        this.matDialogRef.close();
        this.getGroups();

    }
    getRoles() {

        this.rolesService.getAllRole().subscribe((reslt) => {
            this.roles = reslt;

        });
    }

}
