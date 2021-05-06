import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisme } from '../models/organisme';
import { Pays } from '../models/pays';

const API_URL = 'http://localhost:8090/admin';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //Pays services
  public getAllPays():Observable<Pays[]> {
    return this.http.get<[Pays]>(API_URL+'/pays');
  }
  public createPays(pays:Pays):Observable<Pays> {
   return  this.http.post<Pays>(API_URL+'/pays/add',pays);
  }
  public updatePays(paysId : number , pays :Pays):Observable<Pays> {
    return this.http.put<Pays>(API_URL+`/pays/update/${paysId}`,pays);
  }
  public deletePays(paysId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/pays/delete/${paysId}`);
  }

  //Organsime services
  public getAllOrganisme():Observable<Organisme[]> {
    return this.http.get<[Organisme]>(API_URL+'/organismes');
  }
  public createOrganisme(organisme:Organisme):Observable<Organisme> {
   return  this.http.post<Organisme>(API_URL+'/organismes/add',organisme);
  }
  public updateOrganisme(organismeId : number , organisme :Organisme):Observable<Organisme> {
    return this.http.put<Organisme>(API_URL+`/organismes/update/${organismeId}`,organisme);
  }
  public deleteOrganisme(organismeId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/organismes/delete/${organismeId}`);
  }

}
