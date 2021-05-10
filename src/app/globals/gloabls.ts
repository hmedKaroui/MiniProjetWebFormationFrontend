import { TokenStorageService } from '../_services/token-storage.service';
import { Injectable } from "@angular/core";
import { JsonpClientBackend } from '@angular/common/http';

@Injectable( {providedIn: 'root'})
export class AppGlobals {
    readonly ROLE_ADMIN="ROLE_ADMIN";
    readonly ROLE_USER = "ROLE_USER";

    constructor(private tokenStorageService : TokenStorageService) {}

    private getTokenData() {
      const data = this.tokenStorageService.getUser().roles;
      return (data[0]);
      }

    public getUserId() {
      const tmp = this.getTokenData().split(";");
      if(tmp !== null) {
        return JSON.parse(tmp[0]).id // to get the id of the authentificated actor
      }
      return [];
    }
    getUserRoles() {
        const tmp = this.getTokenData().split(";");
        if(tmp !== null) {
          console.log(JSON.parse(tmp[0]).id); // to get the id of the authentificated actor
          tmp.shift();
          
          return tmp;
        }
        return [];
       }

      isAdmin(): boolean {
        const roles =  this.getUserRoles();
       return roles.includes(this.ROLE_ADMIN);
      }

      isUser(): boolean {
        const roles =  this.getUserRoles();
        return roles.includes(this.ROLE_USER);
      }
}