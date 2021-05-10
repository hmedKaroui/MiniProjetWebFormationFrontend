import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation } from '../models/formation';
import { ParticipantInternational } from '../models/participantInternational';
import { ParticipantNational } from '../models/participantNational';
import { User } from '../models/user';
import { Session } from '../models/session';

const API_URL = 'http://localhost:8090/api/test/';
const API_URL2='http://localhost:8090/participant'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }

  //formation 
  public getAllFormation():Observable<Formation[]> {
    return this.http.get<[Formation]>(API_URL2+'/formations');
  }
  public getFormationById(formationId):Observable<Formation> {
    return this.http.get<Formation>(API_URL2+`/formations/${formationId}`);
  }

  //participant
  public getParticipantById(particpantId:number):Observable<any> {
    return this.http.get<any>(API_URL2+`/userDetails/${particpantId}`);
  }
  public updateParticipantSessions(participantId : number , session :Session):Observable<any> {
    return this.http.put<any>(API_URL2+`/userDetails/updateSession/${participantId}`,session);
  }

  public deleteParticipantSessions(participantId : number , sessionId :number):Observable<any> {
    return this.http.delete<any>(API_URL2+`/userDetails/${participantId}/deleteSession/${sessionId}`);
  }
  //user
  public getUserById(userId):Observable<User> {
    return this.http.get<User>(API_URL2+`/user/${userId}`);
  }
  public updateUser(userId : number , user :User):Observable<User> {
    return this.http.put<User>(API_URL2+`/user/update/${userId}`,user);
  }

}

