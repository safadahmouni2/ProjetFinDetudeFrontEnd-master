import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompetanceFilesModels} from '../Models/Competance-files.models';
import {environment} from '../../../environments/environment.prod';
import {UsersModels} from "../Models/Users.models";
import {Autho} from "../Models/Autho";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthentService {
    readonly API_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
    Login(compte)  {
        return this.httpClient.post<Autho>(`${this.API_URL}/api/auth/signin`,compte);


    }
    register(name_user,first_name,email
             ,title,login,pwd,gender,age,phone,date_birth,pays,description, file: File)  {
        const data: FormData = new FormData();
        data.append('file', file, file.name);
        data.append('u', new Blob([JSON.stringify({
            name_user,first_name,email,title,login,pwd,gender,age,phone,date_birth,pays,description
        })], { type: 'application/json' }));
        return this.httpClient.post(`${this.API_URL}/api/auth/signup`,data);


    }

    convertToken(){
       let token = localStorage.getItem('AuthToken');
        let helper = new JwtHelperService();
        let decodedToken = helper.decodeToken(token.toString());
        let userData = { id: decodedToken.id,
            name_user: decodedToken.name_user,
            first_name: decodedToken.first_name,
            email: decodedToken.email,
            title: decodedToken.title,
            login: decodedToken.login,
            pwd: decodedToken.pwd,
            gender: decodedToken.gender,
            age: decodedToken.age,
            phone: decodedToken.phone,
            date_birth: decodedToken.date_birth,
            pays: decodedToken.pays,
            role:decodedToken.aud
        };

        console.log("#######",userData.role);

        return userData;
    }
}
