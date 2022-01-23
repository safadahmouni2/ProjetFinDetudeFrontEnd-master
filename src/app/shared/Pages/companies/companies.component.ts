import {Component, OnInit, ViewChild} from '@angular/core';
import {UsersModels} from '../../Models/Users.models';
import {FormBuilder, FormGroup, NgForm, Validators} from '@angular/forms';
import {FuseAlertType} from '../../../../@fuse/components/alert';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {AuthentService} from '../../Services/authent.service';
import {CompanieModels} from '../../Models/Companie.models';
// import custom validator to validate that password and confirm password fields match
import {MustMatch} from '../_helpers/must-match.validator';



@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {
    companies: CompanieModels;
    selectedFile: File;

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @ViewChild('signUpNgForm') signUpNgForm: NgForm
    ;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signUpForm: FormGroup;
    showAlert: boolean = false;
    registerForm: FormGroup;
    submitted = false;

    constructor(private _snackBar: MatSnackBar,private _router: Router,private authentService: AuthentService,
                private formBuilder: FormBuilder) { }

    ngOnInit(): void {
        this.companies=new CompanieModels();
        this.registerForm = this.formBuilder.group({
            name: ['', Validators.required],
            siret: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            address: ['', [Validators.required]],

            fonction: ['', [Validators.required]],
            responsable: ['', [Validators.required]],
            phone: ['', [Validators.required]],

            fax: ['', [Validators.required]],

            password: ['', [Validators.required, Validators.minLength(7),
                Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),Validators.maxLength(16)]],
            confirmPassword: ['',
               Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }
// convenience getter for easy access to form fields


    get f() { return this.registerForm.controls; }


    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    openSnackBar() {
        this._snackBar.open('Votre inscription a étè validée', 'Ok');
    }
    uploadAvatar(fileList: FileList): void
    {
        this.selectedFile = fileList[0];

    }

onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
}


}
