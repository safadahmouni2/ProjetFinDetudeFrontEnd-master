import {ChangeDetectorRef, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../../core/user/user.service';
import {UsersService} from '../../../Services/users.service';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {UsersModels} from '../../../Models/Users.models';
import {ContactsService} from '../../../../modules/admin/apps/contacts/contacts.service';
import {MatDrawer} from '@angular/material/sidenav';
import {Observable, Subject} from 'rxjs';
import {Contact, Country} from '../../../../modules/admin/apps/contacts/contacts.types';
import {FormControl, FormGroup, NgForm} from '@angular/forms';
import {DOCUMENT} from '@angular/common';
import {FuseMediaWatcherService} from '../../../../../@fuse/services/media-watcher';
import {AuthentService} from '../../../Services/authent.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
    users: Array<UsersModels>;
    userM: UsersModels;
    selectedFile: File;
    selectedProject: string = 'ACME Corp. Backend App';
    data: any;
    @ViewChild('supportNgForm') supportNgForm: NgForm;
    alert: any;
    contactForm: FormGroup;
    formFieldHelpers: string[] = [''];
    constructor(private authentService: AuthentService,private userService: UsersService,private router: Router) { }

  ngOnInit(): void {
      this.userM=new UsersModels();  }
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    getUsers() {
        this.userService.getAllUser().subscribe((reslt) => {
            this.users = reslt;

        });
    }

    addUser( ) {
        let add: any;


        this.authentService.register(this.userM.name_user,this.userM.first_name,this.userM.email,this.userM.title,this.userM.login,
            this.userM.pwd,this.userM.confirmPassword,this.userM.gender,this.userM.age,this.userM.phone,this.userM.date_birth ,this.userM.pays,this.userM.description, this.selectedFile  ).subscribe((reslt) => {
            add = reslt;
        });}
    clearForm(): void
    {
        // Reset the form
        this.supportNgForm.resetForm();
    }
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];

    }
}
