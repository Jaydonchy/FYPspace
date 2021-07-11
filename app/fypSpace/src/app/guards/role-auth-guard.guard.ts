import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class RoleAuthGuardGuard implements CanActivate {
    constructor(
        private _auth: AuthService,
        private _route: Router,
    ) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            const oldUrl = state.url;
            // don't want to be on a child path already,
            // so check that:
            // - we are not already on a child route
            if (route.children.length < 1) {
                let childPath = this._auth.loggedInUser?.student ? 'student' : 'lecturer';
                const newUrl = oldUrl + '/' + childPath;
                this._route.navigateByUrl(newUrl);
            }
            return true;
    }

}
