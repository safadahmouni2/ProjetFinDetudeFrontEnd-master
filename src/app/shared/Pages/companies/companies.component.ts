import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersModels} from '../../Models/Users.models';
import {FormGroup, NgForm} from '@angular/forms';
import {FuseAlertType} from '../../../../@fuse/components/alert';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthentService} from '../../Services/authent.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
    userM: UsersModels;
    selectedFile: File;

    @ViewChild('signUpNgForm') signUpNgForm: NgForm
    ;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    constructor(private _snackBar: MatSnackBar,private _router: Router,private authentService: AuthentService) { }

    ngOnInit(): void {
        this.userM=new UsersModels();
    }
    openSnackBar() {
        this._snackBar.open('Votre inscription a étè validée', 'Ok');
    }
    signUp(): void
    {
        let add: any;


        this.authentService.register(this.userM.name_user,this.userM.first_name,this.userM.email,this.userM.title,this.userM.login,
            this.userM.pwd,this.userM.gender,this.userM.age,this.userM.phone,this.userM.date_birth ,this.userM.pays,this.userM.description, this.selectedFile  ).subscribe((reslt) => {
            add = reslt;

        });


    }
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];

    }

}
