import {Component, OnInit, ViewChild} from '@angular/core';
import {Autho} from '../../Models/Autho';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, NgForm} from '@angular/forms';
import {AuthentService} from '../../Services/authent.service';
import {FuseAlertType} from '../../../../@fuse/components/alert';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    @ViewChild('signInNgForm') signInNgForm: NgForm;

    alert: { type: FuseAlertType; message: string } = {
        type   : 'success',
        message: ''
    };
    signInForm: FormGroup;
    showAlert: boolean = false;
  constructor( private _activatedRoute: ActivatedRoute,
               private _formBuilder: FormBuilder,
               private _router: Router,
               private authService: AuthentService) { }
    login: string='';
    pwd: string='';
    authM: Autho;
  ngOnInit(): void {
  }
    signIn(): void
    {


        const compte= {'login':this.login, 'pwd':this.pwd};

        this.authService.Login(compte).subscribe((result)=>{

            // this.signInForm.enable();

            if(result.accessToken!=null){
                localStorage.setItem('AuthToken',result.accessToken);
                this._router.navigate(['/apps/acceuil']);

                //this._router.navigateByUrl('/dashboards/CompetencesFiles');

            }

            //this.auth=result;
        });


    }
}
