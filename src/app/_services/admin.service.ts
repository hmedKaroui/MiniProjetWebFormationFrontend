import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organisme } from '../models/organisme';
import { ParticipantNational } from '../models/participantNational';
import { Pays } from '../models/pays';
import { Profile } from '../models/profile';

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

  //Profile services

  public getAllProfile():Observable<Profile[]> {
    return this.http.get<[Profile]>(API_URL+'/profiles');
  }

  //Participant National services
  public getAllParticipantNational():Observable<ParticipantNational[]> {
    return this.http.get<[ParticipantNational]>(API_URL+'/participantsNational');
  }
  public createParticipantNational(participantNational:ParticipantNational):Observable<ParticipantNational> {
   return  this.http.post<ParticipantNational>(API_URL+'/participantsNational/add',participantNational);
  }
  public updateParticipantNational(participantNationalId : number , participantNational :ParticipantNational):Observable<ParticipantNational> {
    return this.http.put<ParticipantNational>(API_URL+`/participantsNational/update/${participantNationalId}`,participantNational);
  }
  public updateParticipantNationalProfile(participantNationalId : number , participantNational :ParticipantNational):Observable<ParticipantNational> {
    return this.http.put<ParticipantNational>(API_URL+`/participantsNational/updateProfile/${participantNationalId}`,participantNational);
  }
  public updateParticipantNationalOrganisme(participantNationalId : number , participantNational :ParticipantNational):Observable<ParticipantNational> {
    return this.http.put<ParticipantNational>(API_URL+`/participantsNational/updateOrganisme/${participantNationalId}`,participantNational);
  }
  public deleteParticipantNational(participantNationalId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/participantsNational/delete/${participantNationalId}`);
  }
}
