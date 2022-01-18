import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CompetanceFilesModels} from '../Models/Competance-files.models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {UsersModels} from "../Models/Users.models";
import {GroupsModels} from "../Models/Groups.models";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly API_URL = environment.baseUrl;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly API_URLEX = environment.baseUrlEX;

    constructor(private httpClient: HttpClient) {
    }

    getAllUser(): Observable<Array<UsersModels>> {


        return this.httpClient.get<Array<UsersModels>>(`${this.API_URL}/Users/getUsers`);}

    getNBRUser(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Users/getNBRUsers`);}

    // eslint-disable-next-line @typescript-eslint/naming-convention
    addUser(name_user,first_name,email,title,login,pwd,gender,age,phone,date_birth, file: File): Observable<any> {
        const data: FormData = new FormData();
        data.append('file', file, file.name);
        data.append('u', new Blob([JSON.stringify({
            name_user,first_name,email,title,login,pwd,gender,age,phone,date_birth
        })], { type: 'application/json' }));
        return this.httpClient.post(`${this.API_URL}/Users/addUser`, data);
    }
    getUserID(id) {
        return this.httpClient.get<UsersModels>(`${this.API_URL}/Users/getUserID?id=` + id);


    }

    deleteUser(id){
        return this.httpClient.delete<UsersModels>(`${this.API_URL}/Users/deleteUser?id=` + id
        );
    }
    updateCV(id, name_user, first_name,email,title,login,pwd,gender,age,phone,date_birth
        , file: File): Observable<any> {
        const data: FormData = new FormData();
        data.append('file', file, file.name);
        data.append('u', new Blob([JSON.stringify({
            id, name_user, first_name,email,title,login,pwd,gender,age,phone,date_birth
        })], { type: 'application/json' }));
        return this.httpClient.put(`${this.API_URL}/Users/updateUsers`,data
        );}
    Bloque(id ){

        return this.httpClient.put(`${this.API_URL}/Users/Bloque?id=` + id,  null,
        );}
    Active(id): Observable<any> {
        return this.httpClient.put(`${this.API_URL}/Users/Active?id=`+id,null
        );}
    getNBRuserA(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Users/getNBRuserA`);}
    getNBRuserB(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Users/getNBRuserB`);}
    getNBRuserD(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Users/getNBRuserD`);}
    serchUserByName(name_user): Observable<Array<UsersModels>> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        };
        return this.httpClient.post<Array<UsersModels>>(`${this.API_URL}/Users/findByNameLike`,
            JSON.stringify({
                name_user,
            }),
            {
                headers,
                observe: 'body'
            }
        );
    }
}
