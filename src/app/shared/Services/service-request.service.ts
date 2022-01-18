import { Injectable } from '@angular/core';
import {PublictionModule} from '../Models/publiction.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment.prod';
import {Observable} from 'rxjs';
import {DemandeModule} from '../Models/demande.module';
import {DemandeComp} from "../Models/DemandeComp";
import {GroupsModels} from "../Models/Groups.models";
import {CompetanceFilesModels} from "../Models/Competance-files.models";
import {MatchingModels} from "../Models/Matching.models";

@Injectable({
  providedIn: 'root'
})
export class ServiceRequestService {
    readonly API_URL = environment.baseUrl;
    readonly API_URLMATCHING = environment.baseUrlMATCHING;
  constructor(private httpClient: HttpClient) { }


    getMesDem(id,n,s): Observable<Array<DemandeModule>> {
        return this.httpClient.get<Array<DemandeModule>>
        (`${this.API_URL}/Demande/getMesDem?pageNo=` + n + '&pageSize='+s+'&id='+id);
  }
    getMesDemMatche(id,n,s): Observable<Array<DemandeModule>> {
        return this.httpClient.get<Array<DemandeModule>>
        (`${this.API_URL}/Demande/getMesDemMatche?pageNo=` + n + '&pageSize='+s+'&id='+id);
    }
    getMesPostule(id,n,s): Observable<Array<DemandeModule>> {
        return this.httpClient.get<Array<DemandeModule>>
        (`${this.API_URL}/Demande/getMesPostule?pageNo=` + n + '&pageSize='+s+'&id='+id);
    }
    getAlldem(n,s){
        // @ts-ignoredxsx
        return this.httpClient.get<Array<DemandeModule>>
        (`${this.API_URL}/Demande/getAlldem?pageNo=` + n + '&pageSize='+s);}

    addDem(d: DemandeModule): Observable<any> {

        return this.httpClient.post(`${this.API_URL}/Demande/addSer`, d
        );
    }
    addMatching(id:number,description:string): Observable<any> {

        let headers = {};
        headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
        };
        return this.httpClient.post(`${this.API_URLMATCHING}`,JSON.stringify({
            id, description
        }),{
            headers,
            observe: 'body'
        });
    }
    postule(compId,servId): Observable<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            'Access-Control-Allow-Origin': '*'
        };

        return this.httpClient.post<any>(`${this.API_URL}/Demande/affectation`,
            JSON.stringify({
                compId, servId
        })
            , {
                headers,
                observe: 'body'
            });
    }
    getSer(id) {
        return this.httpClient.get<DemandeModule>(`${this.API_URL}/Demande/getSer?id=` + id);}

}
