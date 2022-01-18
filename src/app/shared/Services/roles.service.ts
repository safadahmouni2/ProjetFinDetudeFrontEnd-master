import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {UsersModels} from '../Models/Users.models';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {RolesModels} from '../Models/Roles.models';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    readonly API_URL = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }
    getAllRole(): Observable<Array<RolesModels>> {


        return this.httpClient.get<Array<RolesModels>>(`${this.API_URL}/Roles/getAllRoles`);}
    getAllRoleActive(): Observable<Array<RolesModels>> {


        return this.httpClient.get<Array<RolesModels>>(`${this.API_URL}/Roles/getAllRolesActive`);}
    Bloque(id ){

        return this.httpClient.put(`${this.API_URL}/Roles/Desactive?id=` + id,  null,
        );}
    Active(id) {
        return this.httpClient.put(`${this.API_URL}/Roles/Active?id=`+id,null
        );}
    getRoleID(id) {
        return this.httpClient.get<RolesModels>(`${this.API_URL}/Roles/getRolesID?id=` + id);}

        Change(id) {
            return this.httpClient.put(`${this.API_URL}/Roles/Change?id=`+id,null
            );}

    getNBRole(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Roles/getNBRole`);}
    getNBRoleA(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Roles/getNBRoleA`);}
    getNBRoleD(): Observable<any> {
        return this.httpClient.get<any>(`${this.API_URL}/Roles/getNBRoleD`);}

}
