import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppGlobals } from '../globals/gloabls';

@Injectable({
  providedIn: 'root'
})
export class UserMiddleware implements CanActivate {
  constructor(private router: Router, private globals: AppGlobals) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.globals.isUser()) {
      return true;
    }
    this.router.navigateByUrl('/');
    return false;
  }
  
}