import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment.prod';
import {HttpClient, HttpHeaders, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {observable, Observable} from 'rxjs';
import {CompetanceFilesModels} from '../Models/Competance-files.models';
import {CommentModels} from "../Models/Comment.models";
import {PostuleModels} from "../Models/Postule.models";

@Injectable({
  providedIn: 'root'
})
export class CompetanceFilesService {
    // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly API_URL = environment.baseUrl;
    // eslint-disable-next-line @typescript-eslint/naming-convention
  readonly API_URLEX = environment.baseUrlEX;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }

  addDossier(comp: CompetanceFilesModels): Observable<any> {

    let headers = {};
    headers = {
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
    };
    return this.httpClient.post(`${this.API_URL}/CompetenceFiles/addCompetencesFiles`, comp,{
      headers,
      observe: 'body'
    });
  }

    getCV(id,n,s): Observable<any> {
        return this.httpClient.get
        (`${this.API_URL}/CompetenceFiles/getCompetencesFiles?pageNo=` + n + '&pageSize='+s+'&id='+id);
    }
    getMine(id): Observable<Array<CompetanceFilesModels>> {
        return this.httpClient.get<Array<CompetanceFilesModels>>(`${this.API_URL}/CompetenceFiles/getMine?id=`+id);


    }
    getAllCVID(id) {
        const headers = {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Content-Type': 'application/json; charset=utf-8',
            // eslint-disable-next-line @typescript-eslint/naming-convention
            'Accept': 'application/json',

        };
        return this.httpClient.get<CompetanceFilesModels>(`${this.API_URL}/CompetenceFiles/getCompetencesFilesID?id=` + id, {
            headers,
            observe: 'body'
        });


    }
    Reffuse(id ){

        return this.httpClient.put(`${this.API_URL}/CompetenceFiles/Reffuse?id=` + id,  null,
        );
  }
    Accept(id): Observable<any> {
        return this.httpClient.put(`${this.API_URL}/CompetenceFiles/Accept?id=`+id,null
        );}
  upload(file: any): Observable<any> {

    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.httpClient.post(`${this.API_URLEX}`,formData );
  }
    deleteContact(id){
        return this.httpClient.delete<CompetanceFilesModels>(`${this.API_URL}/CompetenceFiles/deleteCompetencesFiles?id=` + id
            );
    }
    updateCV(comp: CompetanceFilesModels): Observable<any> {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*'
        };

        return this.httpClient.put(`${this.API_URL}/CompetenceFiles/updateCompetencesFiles`,comp
             );}
}
