import { Component, OnInit } from '@angular/core';
import {GroupsModels} from '../../../Models/Groups.models';
import {GroupsService} from '../../../Services/groups.service';
import {MatDialogRef} from '@angular/material/dialog';
import {MailboxComposeComponent} from '../../../../modules/admin/apps/mailbox/compose/compose.component';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditGComponent implements OnInit {
    group: GroupsModels;
    alert: any;
    groups: Array<GroupsModels>;
    id:any;

  constructor(private groupsService: GroupsService,public matDialogRef: MatDialogRef<MailboxComposeComponent>,private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
          this.getRolesID();
          this.group=new GroupsModels();


      });
  }
    getRolesID() {
        this.groupsService.getGroupID( this.id ).subscribe((reslt) => {
            this.group = reslt;
            console.log(reslt);
        });

    }
    editGroup( ) {
        let add: any;
        console.log('5555555555555' + this.group.id);

        this.groupsService.updateGroup(this.group).subscribe((reslt) => {
            add = reslt;
          //  this.router.navigate(['/apps/CompetencesFiles/liste']);
this.getRoles();
           window.location.reload();

        });
    }
    Close(): void
    {

        // Close the dialog
        this.matDialogRef.close();


    }
    getRoles() {

        this.groupsService.getGroups().subscribe((reslt) => {
            this.groups = reslt;

        });
    }
}
