import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domaine } from '../models/domaine';
import { Formateur } from '../models/formateur';
import { Formation } from '../models/formation';
import { Organisme } from '../models/organisme';
import { ParticipantInternational } from '../models/participantInternational';
import { ParticipantNational } from '../models/participantNational';
import { Pays } from '../models/pays';
import { Profile } from '../models/profile';
import { Session } from '../models/session';

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
  public getOrganismeById(organismeId):Observable<Organisme> {
    return this.http.get<Organisme>(API_URL+`/organismes/${organismeId}`);
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

  //Domaine services
  public getAllDomaine():Observable<Domaine[]> {
    return this.http.get<[Domaine]>(API_URL+'/domaines');
  }
  public gatDomaineById(domaineId:number):Observable<Domaine> {
    return this.http.get<Domaine>(API_URL+`/domaines/${domaineId}`);
  }
  public createDomaine(domaine:Domaine):Observable<Domaine> {
   return  this.http.post<Domaine>(API_URL+'/domaines/add',domaine);
  }
  public updateDomaine(domaineId : number , domaine :Domaine):Observable<Domaine> {
    return this.http.put<Domaine>(API_URL+`/domaines/update/${domaineId}`,domaine);
  }
  public deleteDomaine(domaineId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/domaines/delete/${domaineId}`);
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

  //Participant International services
  public getAllParticipantInternational():Observable<ParticipantInternational[]> {
    return this.http.get<[ParticipantInternational]>(API_URL+'/participantsInternational');
  }
  public createParticipantInternational(participantInternational:ParticipantInternational):Observable<ParticipantInternational> {
   return  this.http.post<ParticipantInternational>(API_URL+'/participantsInternational/add',participantInternational);
  }
  public updateParticipantInternational(participantInternationalId : number , participantInternational :ParticipantInternational):Observable<ParticipantInternational> {
    return this.http.put<ParticipantInternational>(API_URL+`/participantsInternational/update/${participantInternationalId}`,participantInternational);
  }
  public updateParticipantInternationalProfile(participantInternationalId : number , participantInternational :ParticipantInternational):Observable<ParticipantInternational> {
    return this.http.put<ParticipantInternational>(API_URL+`/participantsInternational/updateProfile/${participantInternationalId}`,participantInternational);
  }
  public updateParticipantInternationalPays(participantInternationalId : number , participantInternational :ParticipantInternational):Observable<ParticipantInternational> {
    return this.http.put<ParticipantInternational>(API_URL+`/participantsInternational/updatePays/${participantInternationalId}`,participantInternational);
  }
  public deleteParticipantInternational(participantInternationalId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/participantsInternational/delete/${participantInternationalId}`);
  }

  //Formateur Services
  public getAllFormateur():Observable<Formateur[]> {
    return this.http.get<[Formateur]>(API_URL+'/formateurs');
  }
  public getFormateurById(formateurId:number):Observable<Formateur> {
    return this.http.get<Formateur>(API_URL+`/formateurs/${formateurId}`);
  }
  public createFormateur(formateur:Formateur):Observable<Formateur> {
   return  this.http.post<Formateur>(API_URL+'/formateurs/add',formateur);
  }
  public updateFormateur(formateurId : number , formateur :Formateur):Observable<Formateur> {
    return this.http.put<Formateur>(API_URL+`/formateurs/update/${formateurId}`,formateur);
  }
  public updateFormateurOrganisme(formateurId : number , formateur :Formateur):Observable<Formateur> {
    return this.http.put<Formateur>(API_URL+`/formateurs/updateOrganisme/${formateurId}`,formateur);
  }
  public deleteFormateur(formateurId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/formateurs/delete/${formateurId}`);
  }


  //formation services
  public getAllFormation():Observable<Formation[]> {
    return this.http.get<[Formation]>(API_URL+'/formations');
  }
  public createFormation(formation:Formation):Observable<Formation> {
   return  this.http.post<Formation>(API_URL+'/formations/add',formation);
  }
  public updateFormation(formationId : number , formation :Formation):Observable<Formation> {
    return this.http.put<Formation>(API_URL+`/formations/update/${formationId}`,formation);
  }
  public deleteFormation(formationId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/formations/delete/${formationId}`);
  }

  //Session Services
  public getAllSessions():Observable<Session[]> {
    return this.http.get<[Session]>(API_URL+'/sessions');
  }
  public createSession(session:Session):Observable<Session> {
   return  this.http.post<Session>(API_URL+'/sessions/add',session);
  }
  public updateSession(sessionId : number , session :Session):Observable<Session> {
    return this.http.put<Session>(API_URL+`/sessions/update/${sessionId}`,session);
  }
  public deleteSession(formationId:number):Observable<void> {
    return this.http.delete<void>(API_URL+`/sessions/delete/${formationId}`);
  }
}
