import { Component, OnInit } from '@angular/core';
import {CompetanceFilesService} from '../../../Services/competance-files.service';
import {UsersService} from '../../../Services/users.service';
import {CompetanceFilesModels} from '../../../Models/Competance-files.models';
import {UsersModels} from '../../../Models/Users.models';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditUserComponent implements OnInit {
    id: any;
    userM: UsersModels;
    selectedFile: File;

    constructor(private userService: UsersService,private route: ActivatedRoute,private router: Router) { }

  ngOnInit(): void {
      this.route.queryParams.subscribe((params) => {
          this.id = params['id'];
          this.getUserID();
          this.userM=new UsersModels();


      });

  }
    getUserID() {
        this.userService.getUserID( this.id ).subscribe((reslt) => {
            this.userM = reslt;
            console.log(reslt);
        });

    }
    editCV( ) {
        let add: any;
        this.userService.updateCV(this.userM.id ,this.userM.name_user,this.userM.first_name,this.userM.email,this.userM.title,this.userM.login,this.userM.pwd,this.userM.gender,this.userM.age,this.userM.phone,this.userM.date_birth , this.selectedFile ).subscribe((reslt) => {
            add = reslt;
            this.router.navigate(['/admin/Users/liste']);


        });
    }
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];
        // Upload the avatar
        //this.userService.uploadAvatar(this.userM.id, file).subscribe();
    }

}
