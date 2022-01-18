import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {RolesModels} from '../Models/Roles.models';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {PublictionModule} from '../Models/publiction.module';
import {PageEvent} from "@angular/material/paginator";
import {GroupsModels} from "../Models/Groups.models";
import {DemandeModule} from "../Models/demande.module";
import {Byte} from "@angular/compiler/src/util";
import {By} from "@angular/platform-browser";
import {PublictionAddModule} from "../Models/publictionAdd.module";
import {CommentModels} from "../Models/Comment.models";

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly API_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
    getMesPub(id,n,s): Observable<Array<PublictionModule>> {
        return this.httpClient.get<Array<PublictionModule>>
        (`${this.API_URL}/Pub/getMesPub?pageNo=` + n + '&pageSize='+s+'&id='+id);
    }

    getAllPub(n,s){


        // @ts-ignoredxsx
        return this.httpClient.get<Array<PublictionModule>>
        (`${this.API_URL}/Pub/getAllPub?pageNo=` + n + `&pageSize=`+s);}

    addPubI(users,status, file: File): Observable<any> {
        const data: FormData = new FormData();
        data.append('file', file, file.name);
        data.append('publicationsDto', new Blob([JSON.stringify({
            users,status
        })], { type: 'application/json' }));
        return this.httpClient.post(`${this.API_URL}/Pub/addPubI`, data);
    }
    addPubV(users,status, file: File): Observable<any> {
        const data: FormData = new FormData();
        data.append('file', file, file.name);
        data.append('u', new Blob([JSON.stringify({
            users,status
        })], { type: 'application/json' }));
        return this.httpClient.post(`${this.API_URL}/Pub/addPubV`, data);
    }
    addPub(p: PublictionAddModule): Observable<any> {

        return this.httpClient.post(`${this.API_URL}/Pub/addPub`, p
        );
    }
    signaler(id){
        return this.httpClient.put(`${this.API_URL}/Pub/signaler?id=` + id,  null,
        );}
    nbrAime(id):Observable<any>{
        return this.httpClient.get<any>(`${this.API_URL}/Aime/getNBRAime?id=` + id,
        );}
    aime(pubId,userId){
        return this.httpClient.post(`${this.API_URL}/Aime/aime`, {
            pubId, userId
        });
  }
    aimePas(id,idP){
        return this.httpClient.delete(`${this.API_URL}/Aime/aimepas?id=` + id+ `&idP=`+idP
        );}
    getComment(id,n,s): Observable<Array<CommentModels>> {
        return this.httpClient.get<Array<CommentModels>>
        (`${this.API_URL}/Comment/getCommentaires?pageNo=` + n + '&pageSize='+s+'&id='+id);
    }
    comment(text,pubId,userId){
        return this.httpClient.post(`${this.API_URL}/Comment/add`, {
           text, pubId, userId
        });
    }
}
