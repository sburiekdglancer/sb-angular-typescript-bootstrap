import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { UserService } from "../_services/user.service";
import { Observable } from "rxjs/Rx";
import { ResponseHandlerService } from '../../_services/response-handler.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private _router: Router, private _userService: UserService, private _ResponseHandlerService: ResponseHandlerService ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        if (this._ResponseHandlerService.checkLoggedIn()){
            return true
          }
          else {
            this._router.navigate(['/extra/login'])
            return false 
          }

        // let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // return this._userService.verify().map(
        //     data => {
        //         if (data !== null) {
        //             // logged in so return true
        //             return true;
        //         }
        //         // error when verify so redirect to login page with the return url
        //         this._router.navigate(['/extra/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     },
        //     error => {
        //         // error when verify so redirect to login page with the return url
        //         this._router.navigate(['/extra/login'], { queryParams: { returnUrl: state.url } });
        //         return false;
        //     });
    }
}