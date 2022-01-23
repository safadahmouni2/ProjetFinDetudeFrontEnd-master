import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersModels} from '../../Models/Users.models';
import {AuthentService} from '../../Services/authent.service';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../@fuse/components/alert';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CompanieModels} from '../../Models/Companie.models';
import {MustMatch} from '../_helpers/must-match.validator';
import {CompteEtat} from '../../Models/enum/CompteEtat';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    @ViewChild('signUpNgForm') signUpNgForm: NgForm;
    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    userM: UsersModels;
    selectedFile: File;
    signUpForm: FormGroup;
    showAlert: boolean = false;
    registerForm: FormGroup;
    submitted = false;


    constructor(private _snackBar: MatSnackBar,private _router: Router,private authentService: AuthentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
      this.userM = new UsersModels();

  }

  //  get f() { return this.registerForm.controls; }

    openSnackBar() {
        this._snackBar.open('Votre inscription a étè validée', 'Ok');
    }
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
    }
    signUp(): void
    {
        let add: any;
  this.authentService.register(this.userM.name_user,this.userM.first_name,this.userM.email,this.userM.title,this.userM.login,
            this.userM.pwd,this.userM.confirmPassword,this.userM.gender,this.userM.age,this.userM.phone,this.userM.date_birth ,this.userM.pays,this.userM.description, this.selectedFile  ).subscribe((reslt) => {
            add = reslt;

        });

    }
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];

    }
    password_check(){
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        let m;

        if ((m = regex.exec(this.userM.pwd)) !== null) {
            // The result can be accessed through the `m`-variable.
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
            });
        }
    }

}
