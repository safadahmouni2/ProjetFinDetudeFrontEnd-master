import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {RolesModels} from '../Models/Roles.models';
import {GroupsModels} from '../Models/Groups.models';
import {CompetanceFilesModels} from '../Models/Competance-files.models';
import {GroupRoleUserModels} from "../Models/GroupRoleUser.models";

@Injectable({
  providedIn: 'root'
})
export class GroupsService {
    readonly API_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }



    getNBRGroup(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Groups/getNBRGroup`);}
    getGroups(): Observable<Array<GroupsModels>> {


        return this.httpClient.get<Array<GroupsModels>>(`${this.API_URL}/Groups/getGroups`);}
    getGroupID(id) {
        return this.httpClient.get<GroupsModels>(`${this.API_URL}/Groups/getGroupID?id=` + id);}

    Change(id) {
        return this.httpClient.put(`${this.API_URL}/Groups/Change?id=`+id,null
        );}

    addGroup(g: GroupsModels): Observable<any> {

        return this.httpClient.post(`${this.API_URL}/Groups/addGroup`, g
            );
    }
    deleteGroup(id){
        return this.httpClient.delete<GroupsModels>(`${this.API_URL}/Groups/deleteGroup?id=` + id
        );
    }
    Affectation(gru: GroupRoleUserModels): Observable<any>{
        return this.httpClient. put(`${this.API_URL}/Groups/affectation` ,gru
        );
    }
    updateGroup(comp: GroupsModels): Observable<any> {


        return this.httpClient.put(`${this.API_URL}/Groups/updateGroup`,comp
        );}
    getNBRGroupA(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Groups/getNBRGroupA`);}
    getNBRGroupD(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Groups/getNBRGroupD`);}
}
