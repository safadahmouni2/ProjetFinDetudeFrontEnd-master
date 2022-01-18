import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AbonneeModels} from '../Models/abonnee.models';
import {UsersModels} from '../Models/Users.models';
import {GroupsModels} from '../Models/Groups.models';

@Injectable({
  providedIn: 'root'
})
export class AbonneeService {
// eslint-disable-next-line @typescript-eslint/naming-convention
    readonly API_URL = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

    addAbonnee(id_prestataire,id_abonnee): Observable<any> {

        return this.httpClient.post(`${this.API_URL}/abonnees/addAbonnee`, {id_prestataire,
            id_abonnee}
        );
    }
    countAbonnement(id_abonnee): Observable<any> {
        return this.httpClient.get<any>
        (`${this.API_URL}/abonnees/countAbonnements?id_abonnee=` + id_abonnee);}

    countAbonnee(id_prestataire): Observable<any> {
        return this.httpClient.get<any>
        (`${this.API_URL}/abonnees/countAbonnees?id_prestataire=` + id_prestataire);}

 /*   deleteAbonnee(id: number): Observable<any> {
        return this.httpClient.
        delete<AbonneeModels>
        (`${this.API_URL}/abonnees/desabonner/+${id}`
        );
    }*/
    deleteAbonnee(id: any): Observable<any>{
        return this.httpClient.delete<AbonneeModels>(`${this.API_URL}/abonnees/desabonner/+${id}`
        );
    }
    getEtatAbonnement(id_prestataire,id_abonnee): Observable<any>{
        return this.httpClient.get<AbonneeModels>(`${this.API_URL}/abonnees/getEtatAbonnement/?id_prestataire=`
            + id_prestataire + ' &id_abonnee='+ id_abonnee);

    }
    getEtatAbonnes(id_prestataire,id_abonnee): Observable<any>{
        return this.httpClient.get<AbonneeModels>(`${this.API_URL}/abonnees/getEtatAbonnement/?id_prestataire=`+ id_prestataire + ' &id_abonnee='+ id_abonnee);

    }
    //**get all Abonnements*****
    getAllAbonnement(id_abonnee): Observable<Array<UsersModels>> {
        return this.httpClient.get<Array<UsersModels>>(`${this.API_URL}/abonnees/getAllAbonnement?id_abonnee=` + id_abonnee);
    }
    //**get all Abonnés*****
    getAllAbonnes(id_prestataire): Observable<Array<UsersModels>> {
        return this.httpClient.get<Array<UsersModels>>(`${this.API_URL}/abonnees/getAllAbonnes?id_prestataire=` + id_prestataire);
    }
    //delete  abonnee
    deleteAbonne(id_abonnee,id_prestataire){
        return this.httpClient.delete<GroupsModels>(`${this.API_URL}/abonnees/desabonner?id_abonnee=` + id_abonnee+ ' &id_prestataire='+ id_prestataire);

    }
}
